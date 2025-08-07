import type { ISubcription } from "./subscriptionType";
import type { IUser } from "./userType";

export interface IUserSubscribe{
    _id:string,
    subscriptionId:ISubcription,
    subscription:string,
    userId:IUser,
    customerId:string,
    cancel_At:Date,
    createAt:Date,
}