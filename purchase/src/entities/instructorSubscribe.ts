import { ISubcription } from "./subscription"

 export interface IInstructorSubscribe{
    _id:string,
     subscriptionId:ISubcription,
    customerId:string,
    subscription:string,
    userId:string,
    cancel:Date
}