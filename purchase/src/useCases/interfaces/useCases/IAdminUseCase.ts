import { NextFunction } from "express";
import { ISubcription } from "../../../entities/subscription";
import Stripe from "stripe";
import { IOrder } from "../../../entities/order";
import exceljs from 'exceljs'
import { Iuser } from "../../../entities/user";
export interface IAdminUseCase{
    createSubscription(price:number,plan:string,description:string[],next:NextFunction):Promise<ISubcription|void>
    getSubscriptions():Promise<ISubcription[]|void>
    deleteSubscription(subscriptionId:string,next:NextFunction):Promise<ISubcription|void>
    editSubscription(subscriptionId:string,price:number,next:NextFunction):Promise<ISubcription|void>
    getOrders(start:string,end:string,next:NextFunction):Promise<IOrder[]|void>
    getOrdersForChart(start:string,end:string,next:NextFunction):Promise<IOrder[]|void>
    createReport(start:string,end:string,next:NextFunction):Promise<exceljs.Workbook|void>
    
}