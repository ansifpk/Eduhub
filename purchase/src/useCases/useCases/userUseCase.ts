import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
// import { ICourse } from "../../entities/course";
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



export class UserUseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}

    async fetchOrders(userId:string,next: NextFunction): Promise<ICourse[] | void> {
        
       try {
          const courses = await  this.userRepository.findAllCurses(userId)
          if(courses){
            return courses
          }
       } catch (error) {
        console.error(error)
       }
         
        // throw new Error("Method not implemented.");
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
           let total = courses.reduce((acc,cur)=>{
              return acc+cur.price
           },0)
         
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