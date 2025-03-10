import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-01-27.acacia",
});


export class UserController{
    constructor(
        private userUseCase:IUserUseCase
    ){}
  
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