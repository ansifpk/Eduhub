import { IOrder } from "../../../../entities/order";
import { ISubcription } from "../../../../entities/subscription";
import { IAdminRepository } from "../../../../useCases/interfaces/repository/IAdminrepository";
import { OrderModel } from "../models/orderModel";
import { subscriptionModel } from "../models/subscriptionModel";


export class AdminRepository implements IAdminRepository{
    constructor(
        private subscriptionModels:typeof subscriptionModel,
        private orderModels:typeof OrderModel
    ){}

    async findOrders(): Promise<IOrder []| void> {
        try {
            const orders = await this.orderModels.find().populate("user")
            if(orders){
                return orders
            }
        } catch (error) {
            console.error(error)
        }
    }

    async setProductId(subscriptionId:string,productId: string,priceId:string): Promise<ISubcription | void> {
        try {
            const subscription = await this.subscriptionModels.findByIdAndUpdate({_id:subscriptionId},{$set:{
                productId,
                priceId
            }},{new:true});

            if(subscription){
                return subscription
            }

        } catch (error) {
            console.error(error)
        }
    }

    async subscriptionEditById(subscriptionId: string,price:number,priceId:string): Promise<ISubcription | void> {
        try {
            const subscription = await this.subscriptionModels.findByIdAndUpdate({_id:subscriptionId},{$set:{
                price,
                priceId
            }},{new:true});
            if(subscription){
                return subscription;
            }
           } catch (error) {
            console.error(error)
           }
    }
    
    async subscriptionDeleteById(subscriptionId: string): Promise<ISubcription | void> {
        try {
            const subscription = await this.subscriptionModels.findByIdAndDelete({_id:subscriptionId});
            if(subscription){
                return subscription;
            }
           } catch (error) {
            console.error(error)
           }
    }
    
    async findSubscriptionById(subscriptionId: string): Promise<ISubcription | void> {
        try {
            const subscription = await this.subscriptionModels.findById({_id:subscriptionId});
            if(subscription){
                return subscription;
            }
           } catch (error) {
            console.error(error)
           }
    }
    async findSubscriptions(): Promise<ISubcription[] | void> {
       try {
        const subscriptions = await this.subscriptionModels.find();
        if(subscriptions){
            return subscriptions;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async findSubscription(plan: string): Promise<ISubcription | void> {
        try {
            const subscription = await this.subscriptionModels.findOne({plan:plan});
            if(subscription){
                return subscription;
            }
        } catch (error) {
            console.error(error)
        }
    }
    async createSubscription(price:number,plan:string,description:string[]): Promise<ISubcription | void> {
       try {

        const subscription = await this.subscriptionModels.create({
            price,
            description,
            plan
        });
       
        if(subscription){
            return subscription;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async findChartOrders(): Promise<IOrder[] | void> {
       try {

       const orders = await OrderModel.aggregate([
               {
                 $group: {
                   _id: { $year: "$createdAt" }, 
                   Courses: { $sum: 1 } 
                 }
               },
               {
                 $sort: { _id: 1 }, 
               },
             ])
          
             if(orders){
               return orders
              }
       } catch (error) {
        console.error(error)
       }
    }

   
    
}