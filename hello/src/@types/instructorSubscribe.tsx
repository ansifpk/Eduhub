import type { ISubcription } from "./subscriptionType";

export interface IInstructorSubscribe{
    _id:string,
    subscriptionId:ISubcription,
    userId:string,
    customerId:string,
    cancel_At:Date,
    createAt:Date,
}