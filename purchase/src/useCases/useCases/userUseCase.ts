import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
import { ICourse } from "../../entities/course";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IUserRepository } from "../interfaces/repository/IUserRepositoru";
import ErrorHandler from "../middlewares/errorHandler";
import { Iuser } from "../../entities/user";
import Stripe from "stripe";
import { OrderCreatedPublisher } from "../../framwork/webServer/config/kafka/producer/order-created-publisher";
import kafkaWrapper from "../../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { CouponUsedPublisher } from "../../framwork/webServer/config/kafka/producer/coupon-used-producer";
import { ISubcription } from "../../entities/subscription";
import { IUserSubcription } from "../../entities/userSubscription";
import { IUserSubscribe } from "../../entities/userSubscribe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
   apiVersion: "2024-12-18.acacia",
 });


export class UserUseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}
    async purchasedSubscriptions(userId: string, next: NextFunction): Promise<IUserSubscribe[] | void> {
     try {
       const user = await this.userRepository.findUser(userId)
       if(!user){
         return next(new ErrorHandler(400,"user not fount"))
       } 
       const plans = await this.userRepository.plans(userId);
       if(plans){
         return plans
       }
     } catch (error) {
      console.error(error)
     }
    }

   async purchaseSubscriptions(userId: string,subscriptionId:string, next: NextFunction): Promise<string | void> {
      try {
        
         const user = await this.userRepository.findUser(userId)
         if(!user){
            return next(new ErrorHandler(400,"user not fount"))
         }
         const subscription =  await this.userRepository.subscriptionFindById(subscriptionId)
         if(!subscription){
            return next(new ErrorHandler(400,"Subscription not fount"))
         }
         console.log(subscription);
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
            success_url: "http://localhost:5173/user/success",
            cancel_url: "https://localhost:5173/user/faile",
            
        })
   
        return session.id;
         
         
      } catch (error) {
         console.error(error)
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
        return next(new ErrorHandler(400,"user not fount"))
       }
    //      console.log("order");
         
        // const courseData = await this.userRepository.create(user.id,courseId,order)
        
        // if(courseData){
        //     console.log("usease end");
        //     return courseData;
        // }
        
    }
    
     async subscriptionDetailes(customerId: string, next: NextFunction): Promise<string | void> {
           try {
              const portalSession = await stripe.billingPortal.sessions.create({
                customer:customerId,
                return_url:`http://localhost:5173/users/courses`
              })
             
              if(portalSession){
                return portalSession.url
              }
           } catch (error) {
            console.error(error)
           }
      }
      
    async webHook(event: Stripe.Event,next:NextFunction): Promise<void> {
   
        const session = event.data.object as Stripe.Checkout.Session;
        const {metadata} = session;
        let {userId,courseIds,couponOffer,couponId,} = metadata as any
        if(userId&&courseIds){
           const courses:ICourse[] = []
           courseIds = JSON.parse(courseIds as string)
          
           for(let i=0;i<courseIds.length;i++){
              const course = await this.userRepository.findById(courseIds[i])
              if(course){
                 courses.push(course)
              }
           }
         
         
           switch (event.type){
              case 'checkout.session.completed':
               
                 
                 for(let value of courses){

                     value.price =  Math.floor(value.price - (value.price*parseInt(couponOffer))/100)
                     const order = await this.userRepository.create(userId,value);
                     if(order){

                        await new OrderCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                            _id: value._id!,
                            userId: userId
                        }
                        
                        )
                     }
                 }
           
                 if(couponId){
                    console.log(couponOffer,'couponId',couponId);
                    await new CouponUsedPublisher(kafkaWrapper.producer as Producer).produce({
                       couponId: couponId,
                       userId: userId
                    })
                 }
                  break;
              case 'payment_intent.payment_failed':
                 console.log("failed");
                  break;
                  
           }
       
        }
        
   }
}