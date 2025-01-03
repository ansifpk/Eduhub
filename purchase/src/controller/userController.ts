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
interface IUser{
    id:string
}

export class UserController{
    constructor(
        private userUseCase:IUserUseCase
    ){}
    async webhook(req: Request, res: Response, next: NextFunction) {
        const sig = req.headers["stripe-signature"] as string;
        const enpointSeceret = process.env.STRIPE_WEBHOOK_SECRET as string;
        // console.log(sig,"signature");
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
}