import { IOrder } from "../../../entities/order";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";
import { Iuser } from "../../../entities/user";
import { IUserSubscribe } from "../../../entities/userSubscribe";
import { ISubcription } from "../../../entities/subscription";
import { IUserSubcription } from "../../../entities/userSubscription";


export interface IUserRepository{
    create(userId:string,course:ICourse):Promise<ICourse|void>
    findAllCurses(userId:string):Promise<ICourse[]|void>
    findById(courseId:string):Promise<ICourse|void>
    findUser(userId:string):Promise<Iuser|void>
    // findOrderById(orderId:string):Promise<IOrder|void>
    // findOrderById(orderId:string):Promise<IOrder|void>
    purchaseSubscription(customerId:string,subscriptionId:string,subscription:string,userId:string):Promise<IUserSubscribe|void>
    subscriptions(instructorId:string):Promise<IUserSubcription[]|void>
    plans(userId:string):Promise<IUserSubscribe[]|void>
    subscriptionFindById(subscriptionId:string):Promise<IUserSubcription|void>
}