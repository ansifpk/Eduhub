import { NextFunction,Response,Request } from "express";
import Stripe from "stripe";
import { IWebhookUseCase } from "../useCases/interfaces/useCases/IWebhookUseCase";
import { ErrorHandler } from "@eduhublearning/common";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2025-01-27.acacia",
  });

export class WebhookController{
    constructor(
       private webhookUseCase:IWebhookUseCase
    ){}

    async webhook(req:Request,res:Response,next:NextFunction){
        try {
          
           const sig = req.headers["stripe-signature"] as string;
                  const enpointSeceret = process.env.STRIPE_WEBHOOK_SECRET as string;
           
                    if (!sig) {
                      return next(new ErrorHandler(400, "missing stripe signature"));
                    }
                    const event = stripe.webhooks.constructEvent(
                      req.body,
                      sig,
                      enpointSeceret
                    );
                    await this.webhookUseCase.webHook(event, next);
        } catch (error) {
         console.error(error)
        }
        
     }

}