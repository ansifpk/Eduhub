import { IOrder } from "../../../entities/order";
import { ICourse } from "../../../entities/types/course";
import { IUserSubcription } from "../../../entities/userSubscription";
import { ISubcription } from "../../../entities/subscription";
import { Iuser } from "../../../entities/user";
import { IInstructorSubscribe } from "../../../entities/instructorSubscribe";

export interface IInstructorRepository{
    orders():Promise<IOrder[]|void>
    instrutcorOrders(userId:string): Promise<IOrder[] | void>
    userFindById(userId:string):Promise<Iuser|void>
    findSubscriptions():Promise<ISubcription[]|void>
    subscribeInstructor(method:string):Promise<ISubcription|void>
    subscriptionFindByPlan(method:string):Promise<ISubcription|void>
    subscriptionSetUser(subscriptionId:string,userId:string,customerId:string):Promise<ISubcription|void>
    findPlans(userId:string):Promise<IInstructorSubscribe[]|void>
    findPlan(userId:string):Promise<IInstructorSubscribe|void>
    createSubscribe(userId:string,subscriptionId:string,customerId:string,subscription:string):Promise<IInstructorSubscribe|void>
    cancelSubscribe(date:number,customerId:string):Promise<IInstructorSubscribe|void>
    renewSubscribe(customerId:string):Promise<IInstructorSubscribe|void>
    checkSubscribe(customerId:string):Promise<IInstructorSubscribe|void>
    findInstructorSubscriptions(userId:string):Promise<IUserSubcription[]|void>
    userSubscriptionFindByPlan(plan:string):Promise<IUserSubcription|void>
    userSubscriptionFindById(subscriptionId:string):Promise<IUserSubcription|void>
    userSubscriptionFindByAndUpdate(subscriptionId:string,price:number):Promise<IUserSubcription|void>
    setPriceId(subscriptionId:string,priceId:string):Promise<IUserSubcription|void>
    subscriptionCreate(userId:string,price:number,plan:string,description:string[],productId:string,priceId:string):Promise<IUserSubcription|void>
}