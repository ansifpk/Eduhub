import { ICourse } from "../../../entities/course";
import { IInstructorSubscribe } from "../../../entities/instructorSubscribe";
import { IUserSubscribe } from "../../../entities/userSubscribe";

export interface IWebhookRepository{
     //! instructor
     createSubscribe(userId:string,subscriptionId:string,customerId:string,subscription:string):Promise<IInstructorSubscribe|void>
     renewSubscribe(customerId:string):Promise<IInstructorSubscribe|void>
     checkSubscribe(customerId:string):Promise<IInstructorSubscribe|void>
     cancelSubscribe(date:number,customerId:string):Promise<IInstructorSubscribe|void>
     //! user
     createUserSubscribe(userId:string,subscriptionId:string,customerId:string,subscription:string):Promise<IUserSubscribe|void>
     renewUserSubscribe(customerId:string):Promise<IUserSubscribe|void>
     checkUserSubscribe(customerId:string):Promise<IUserSubscribe|void>
     cancelUserSubscribe(date:number,customerId:string):Promise<IUserSubscribe|void>
     create(userId:string,course: ICourse): Promise<ICourse | void>
     findById(courseId:string):Promise<ICourse|void>
}