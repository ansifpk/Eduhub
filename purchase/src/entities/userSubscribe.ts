import { IUserSubcription } from "./userSubscription"

export interface IUserSubscribe{
    _id:string,
    subscriptionId:IUserSubcription,
    customerId:string,
    userId:string,
    cancel:Date
}