import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import { OrderCreatedPublisher } from "../framwork/webServer/config/kafka/producer/order-created-publisher";
import kafkaWrapper from "../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { ICourse } from "../entities/course";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2024-12-18.acacia",
});


export class UserController{
    constructor(
        private userUseCase:IUserUseCase
    ){}
    async webhook(req: Request, res: Response, next: NextFunction) {
        const sig = req.headers["stripe-signature"] as string;
        const enpointSeceret = process.env.STRIPE_WEBHOOK_SECRET as string;
        try {
          if (!sig) {
            return next(new ErrorHandler(400, "missing stripe signature"));
          }
          const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            enpointSeceret
          );
          await this.userUseCase.webHook(event, next);
        } catch (error: any) {
          console.error(error);
        }
      }

    async puchasedCourses(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
        const orders =  await this.userUseCase.fetchOrders(userId,next)
        if(orders){
            return res.send({success:true,orders:orders})
        }
    }
    async getSubscriptions(req:Request,res:Response,next:NextFunction){
        const {instructorId} = req.params
        const subscriptions =  await this.userUseCase.getSubscriptions(instructorId,next)
        if(subscriptions){
            return res.send({success:true,subscriptions})
        }
    }
    async purchasedSubscriptions(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
        const plans =  await this.userUseCase.purchasedSubscriptions(userId,next)
      
        if(plans){
            return res.send({success:true,plans})
        }
    }

    async purchaseSubscription(req:Request,res:Response,next:NextFunction){
        const {subscriptionId} = req.params
        const {userId} = req.body
        const sessionId =  await this.userUseCase.purchaseSubscriptions(userId,subscriptionId,next)
        if(sessionId){
            return res.send({success:true,sessionId})
        }
    }

    async subscriptionDetailes(req:Request,res:Response,next:NextFunction){
      try {
      const {customerId} = req.params;
      const sessionId =  await this.userUseCase.subscriptionDetailes(customerId,next)
      if (sessionId) {
          res.send({success:true, url:sessionId });
        }
      } catch (error) {
          console.error(error)
      }
  }
}