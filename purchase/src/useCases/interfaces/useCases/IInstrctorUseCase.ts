import { NextFunction } from "express";
import { IOrder } from "../../../entities/order";
import { IUserSubcription } from "../../../entities/userSubscription";
import { ISubcription } from "../../../entities/subscription";
import { IInstructorSubscribe } from "../../../entities/instructorSubscribe";
import exceljs from 'exceljs';
export interface IInstructorUseCase{
    getOrders(instructorId:string,start:string,end:string,next:NextFunction):Promise<IOrder[]|void>
    getSubscriptions(next:NextFunction):Promise<ISubcription[]|void>
    purchaseSubscription(userId:string,method:string,next:NextFunction):Promise<string|void>
    subscriptionDetailes(customerId:string,next:NextFunction):Promise<string|void>
    getInstructorsSubscriptions(next:NextFunction):Promise<IUserSubcription[]|void>
    getPlans(userId:string,next:NextFunction):Promise<IInstructorSubscribe[]|void>
    instructorSubscriptions(userId:string,next:NextFunction):Promise<IUserSubcription[]|void>
    createSubscription(userId:string,plan:string,price:number,description:string[],next:NextFunction):Promise<IUserSubcription|void>
    editSubscription(subscriptionId:string,price:number,next:NextFunction):Promise<IUserSubcription|void>
    createReport(userId:string,report:string,year:string,month:string,next:NextFunction):Promise<exceljs.Workbook|void>
    instructorOrders(instructorId: string,filter:string,next:NextFunction):Promise<IOrder[]|void>
}