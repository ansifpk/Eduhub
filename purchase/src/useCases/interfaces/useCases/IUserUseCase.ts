import { NextFunction } from "express";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";
import { IOrder } from "../../../entities/order";
import { Iuser } from "../../../entities/user";
import Stripe from "stripe";
import { ISubcription } from "../../../entities/subscription";
import { IUserSubcription } from "../../../entities/userSubscription";
import { IUserSubscribe } from "../../../entities/userSubscribe";

export interface IUserUseCase{
    createOrder(data:{courseId:string,user:Iuser,order:IOrder},next:NextFunction):Promise<ICourse|void>
    fetchOrders(userId:string,next:NextFunction):Promise<ICourse[]|void>
    getSubscriptions(instructorId:string,next:NextFunction):Promise<IUserSubcription[]|void>
    purchaseSubscriptions(userId:string,subscriptionId:string,next:NextFunction):Promise<string|void>
    purchasedSubscriptions(userId:string,next:NextFunction):Promise<IUserSubscribe[]|void>
    subscriptionDetailes(customerId: string, next: NextFunction): Promise<string | void>
}