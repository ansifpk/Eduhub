import { IOrder } from "../../entities/order";
import { ISubcription } from "../../entities/subscription";

export interface IAdminRepository{
    createSubscription(price:number,plan:string,description:string[]):Promise<ISubcription|void>
    findSubscription(plan:string):Promise<ISubcription|void>
    findSubscriptions():Promise<ISubcription[]|void>
    findSubscriptionById(subscriptionId:string):Promise<ISubcription|void>
    subscriptionDeleteById(subscriptionId:string):Promise<ISubcription|void>
    subscriptionEditById(subscriptionId:string,price:number,priceId:string):Promise<ISubcription|void>
    setProductId(subscriptionId:string,productId:string,priceId:string):Promise<ISubcription|void>
    findOrders(start:string,end:string):Promise<IOrder[]|void>
    findChartOrders(start:string,end:string):Promise<IOrder[]|void>
    
}