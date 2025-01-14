import { ISubcription } from "./subscriptionType";

export interface IUserSubscribe{
    _id:string,
    subscriptionId:ISubcription,
    subscription:string,
    userId:string,
    customerId:string,
    cancel_At:Date,
    createAt:Date,
}