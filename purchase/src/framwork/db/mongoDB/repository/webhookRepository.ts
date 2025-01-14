import { IInstructorSubscribe } from "../../../../entities/instructorSubscribe";
import { IUserSubscribe } from "../../../../entities/userSubscribe";
import { IWebhookRepository } from "../../../../useCases/interfaces/repository/IwebhookRepository";
import { instructotSubscribeModel } from "../models/instructorSubscribe";
import { subscriptionModel } from "../models/subscriptionModel";
import { UserModel } from "../models/userMode";
import { userSubscribeModel } from "../models/userSubscribe";
import { userSubscriptionModel } from "../models/userSuscriptionModel";

export class WebhookRepository implements IWebhookRepository{
    constructor(
      private userSubscriptionModels: typeof userSubscriptionModel,
      private subscriptionModels: typeof subscriptionModel,
      private userModels: typeof UserModel,
      private subscribeModel: typeof instructotSubscribeModel,
      private subscribeUserModel: typeof userSubscribeModel,
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
    
}