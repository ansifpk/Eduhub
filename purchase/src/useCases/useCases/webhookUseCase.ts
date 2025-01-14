import { NextFunction } from "express";
import Stripe from "stripe";
import { IWebhookUseCase } from "../interfaces/useCases/IWebhookUseCase";
import { IWebhookRepository } from "../interfaces/repository/IwebhookRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2024-12-18.acacia",
});

export class WebhookUseCase implements IWebhookUseCase{
    constructor(
     private webhokkRepository:IWebhookRepository
    ){}
    async webHook(event: Stripe.Event, next: NextFunction): Promise<void> {
        try {
         console.log("hook");
         
         const session = event.data.object as Stripe.Checkout.Session;
         const previous =  event.data.previous_attributes as any;
         
             switch(event.type){
                 case "checkout.session.completed":
                     console.log('checkout.session.completed',);
                     
                     if(session.metadata!.buyer == "instructor"){
                       console.log("instructor purchased");
                       await this.webhokkRepository.createSubscribe(session.metadata!.userId,session.metadata!.subscriptionId,session.metadata!.customerId,session.subscription as string)
                     }else if(session.metadata!.buyer == "user"){
                       console.log("user purchased");
                       await this.webhokkRepository.createUserSubscribe(session.metadata!.userId,session.metadata!.subscriptionId,session.metadata!.customerId,session.subscription as string)
                     }else{
                       console.log("purcha course");
                       
                     }
                     break;
                 
                 case "customer.subscription.deleted":
                     console.log("instructor subscription deleted");
                     // console.log(event.data);
                     break;
                 case "customer.subscription.paused":
                     console.log("instructor subscription paused");
                     // console.log(event.data);
                     break;
 
                 case "customer.subscription.resumed":
                     console.log("instructor subscription resumed");
                     // console.log(event.data);
                     break;
                 
                 case "customer.subscription.created":
                     console.log("instructor subscription created");
                     // console.log('event.data',event.data);
                     // console.log('session2',session2);
                     break;
                 
                 case "customer.subscription.updated":
                     console.log("instructor stripe updated");
                      
                       if(event.data.previous_attributes?.cancel_at_period_end){
                        
                         const customer = await stripe.customers.retrieve(event.data.object.customer as string) as Stripe.Customer;
                           const {userType} = customer.metadata
                           if(userType   == "instructor"){
                             // console.log("instructor rene");
                             await this.webhokkRepository.renewSubscribe(event.data.object.customer as string)
                             return
                           }else{
                             // console.log("user rene",userType) 
                             await this.webhokkRepository.renewUserSubscribe(event.data.object.customer as string)
                             return
                           }
                        
                       }else if(previous?.plan?.id && session.metadata!.edited){
                         // console.log("instructor edited send notification");
                         return
                         }else if(!event.data.previous_attributes?.status && !event.data.previous_attributes?.cancel_at_period_end){
                           const customer = await stripe.customers.retrieve(event.data.object.customer as string) as Stripe.Customer;
                           const {userType} = customer.metadata
                           if(userType   == "instructor"){
                             await this.webhokkRepository.cancelSubscribe(event.data.object.cancel_at!,event.data.object.customer as string)
                             return
                           }else{
                             // console.log("user cancell",userType)
                             await this.webhokkRepository.cancelUserSubscribe(event.data.object.cancel_at!,event.data.object.customer as string) 
                             return
                           }
                           
 
                         }else if(event.data.previous_attributes?.status){
                           // console.log("instructor sub created"); 
                           return
                         }else{
                           
                         }
 
                     break;
             }
        } catch (error) {
         console.error(error)
        }
     }
}