import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
import { ICourse } from "../../entities/course";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IUserRepository } from "../interfaces/repository/IUserRepositoru";
import { Iuser } from "../../entities/user";
import Stripe from "stripe";
import { IUserSubcription } from "../../entities/userSubscription";
import { IUserSubscribe } from "../../entities/userSubscribe";
import {  NotFoundError, StatusCodes } from "@eduhublearning/common";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
   apiVersion: "2025-01-27.acacia",
 });


export class UserUseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}
    async purchasedSubscriptions(userId: string, next: NextFunction): Promise<IUserSubscribe[] | void> {
     try {
       const user = await this.userRepository.findUser(userId)
       if(!user){
         throw new NotFoundError("user not fount")
        
       } 
       const plans = await this.userRepository.plans(userId);
       if(plans){
         return plans
       }
     } catch (error) {
      console.error(error);
      next(error)
     }
    }

   async purchaseSubscriptions(userId: string,subscriptionId:string, next: NextFunction): Promise<string | void> {
      try {
        
         const user = await this.userRepository.findUser(userId)
         if(!user){
            throw new NotFoundError("user not fount")
          
         }
         const subscription =  await this.userRepository.subscriptionFindById(subscriptionId)
         if(!subscription){
            throw new NotFoundError("Subscription not fount")
           
         }
         let customer = await stripe.customers.create({
            name: user.name,
            email: user.email,
            address: {
              line1: "123 Street Name",
              city: "City Name",
              country: "AE",
              postal_code: "12345",
            },
            metadata:{
              userType:"user"
            }
          });
        
      
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer:customer.id,
            mode:'subscription',
            line_items:[{
                price:subscription.priceId,
                quantity:1,
            }],
            metadata:{
                userId:userId,
                buyer:"user",
                customerId:customer.id,
                subscriptionId:JSON.stringify(subscription._id),
                edited:''
            },
            success_url: process.env.subscription_success_user_url,
            cancel_url: process.env.subscription_failed_user_url,
        })
        if(session){
           return session.id;
        }
         
         
      } catch (error) {
         console.error(error)
         next(error)
      }
   }

   async getPlans(userId: string, next: NextFunction): Promise<IUserSubscribe[] | void> {
      try {
         const plans = await this.userRepository.plans(userId)
         if(plans){
            return plans
         }
      } catch (error) {
         console.error(error)
      }
   }

   async getSubscriptions(instructorId: string, next: NextFunction): Promise<IUserSubcription[] | void> {
      try {
         const subscriptions = await this.userRepository.subscriptions(instructorId)
         if(subscriptions){
            return subscriptions
         }
      } catch (error) {
         console.error(error)
      }
   }

    async fetchOrders(userId:string,next: NextFunction): Promise<ICourse[] | void> {
        
       try {
          const courses = await  this.userRepository.findAllCurses(userId)
          if(courses){
            return courses
          }
       } catch (error) {
        console.error(error)
       }
         
        
    }

   async createOrder(data: {courseId:string,user:Iuser,order:IOrder}, next: NextFunction): Promise<ICourse | void> {
       const {courseId,user,order} = data;
    
       console.log("usecase statrt");
       const course = await this.userRepository.findUser(user.id)
       if(!course){
         throw new NotFoundError("user not fount")
       
       }
  
        
    }
    
     async subscriptionDetailes(customerId: string, next: NextFunction): Promise<string | void> {
           try {
              const portalSession = await stripe.billingPortal.sessions.create({
                customer:customerId,
                return_url:`${process.env.CLIENT_URL}/user/profile/plan`
              })
             
              if(portalSession){
                return portalSession.url
              }
           } catch (error) {
            console.error(error)
           }
      }
}