import { ICourse } from "../../../../entities/course";
import { IInstructorSubscribe } from "../../../../entities/instructorSubscribe";
import { IUserSubscribe } from "../../../../entities/userSubscribe";
import { IWebhookRepository } from "../../../../useCases/interfaces/repository/IwebhookRepository";
import { courseModel } from "../models/courseMode";
import { instructotSubscribeModel } from "../models/instructorSubscribe";
import { OrderModel } from "../models/orderModel";
import { userSubscribeModel } from "../models/userSubscribe";


export class WebhookRepository implements IWebhookRepository{
    constructor(
      private subscribeModel: typeof instructotSubscribeModel,
      private subscribeUserModel: typeof userSubscribeModel,
      private orderMedels: typeof OrderModel,
      private courseModels: typeof courseModel,
    ){}
  async createUserSubscribe(userId: string, subscriptionId: string, customerId: string, subscription: string): Promise<IUserSubscribe | void> {
    try {
      const subscribe = await this.subscribeUserModel.create({
        subscriptionId:JSON.parse(subscriptionId),
        customerId,
        userId,
        subscription,
      })
      if(subscribe){
        return subscribe;
      }
    } catch (error) {
    console.error(error)
    }
  }
  async renewUserSubscribe(customerId: string): Promise<IUserSubscribe | void> {
    try {
      const subscribe = await this.subscribeUserModel.findOneAndUpdate({customerId:customerId},{$unset:{cancel_At:""}},{new:true}) 
          if(subscribe){
            return subscribe
          }
    } catch (error) {
      console.error(error)
    }
  }
  async checkUserSubscribe(customerId: string): Promise<IUserSubscribe | void> {
    const subscribe = await this.subscribeUserModel.findOne({customerId:customerId}) 
    if(subscribe){
      return subscribe
    }
  }
  async cancelUserSubscribe(date: number, customerId: string): Promise<IUserSubscribe | void> {
    const subscribe = await this.subscribeUserModel.findOneAndUpdate({customerId:customerId},{$set:{cancel_At:new Date(date*1000)}},{new:true}) 
      if(subscribe){
        return subscribe
      }
  }
    async cancelSubscribe(date: number, customerId: string): Promise<IInstructorSubscribe | void> {
      try {
      const subscribe = await this.subscribeModel.findOneAndUpdate({customerId:customerId},{$set:{cancel_At:new Date(date*1000)}},{new:true}) 
      if(subscribe){
        return subscribe
      }
      } catch (error) {
      console.error(error)
      }
   }
    
    async createSubscribe(userId: string, subscriptionId: string, customerId: string, subscription: string): Promise<IInstructorSubscribe | void> {
       try {
      
        const subscribe = await this.subscribeModel.create({
          subscriptionId:JSON.parse(subscriptionId),
          customerId,
          userId,
          subscription,
        })
        if(subscribe){
          return subscribe;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async renewSubscribe(customerId: string): Promise<IInstructorSubscribe | void> {
        try {
          const subscribe = await this.subscribeModel.findOneAndUpdate({customerId:customerId},{$unset:{cancel_At:""}},{new:true}) 
          if(subscribe){
            return subscribe
          }
          } catch (error) {
           console.error(error)
          }
    }
    async checkSubscribe(customerId: string): Promise<IInstructorSubscribe | void> {
        try {
          const subscribe = await this.subscribeModel.findOne({customerId:customerId}) 
          if(subscribe){
            return subscribe
          }
          } catch (error) {
           console.error(error)
          }
    }

    async create(userId:string,course: ICourse): Promise<ICourse | void> {
      try {
        const order = await this.orderMedels.create({user:userId,course:course})
        if(order){
          let check = await this.courseModels.findByIdAndUpdate(
              { _id: course._id! }, 
              { $addToSet: { students: userId } },
              { new: true } 
            )
          if(check){
            console.log("order",order,check);
            
            return check
          }
        }
    
      } catch (error) {
        console.error(error)
      }
    }

    async findById(courseId: string): Promise<ICourse | void> {
      try {
       const course = await this.courseModels.findById({_id:courseId}).populate("instructorId");
       if (course) {
         return course 
       }
      } catch (error) {
       console.error(error)
      }
   }
    
}