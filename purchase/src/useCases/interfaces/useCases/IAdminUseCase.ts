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
    getOrders(report:string,year:string,month:string,next:NextFunction):Promise<IOrder[]|void>
    getOrdersForChart():Promise<IOrder[]|void>
    createReport(report:string,year:string,month:string,next:NextFunction):Promise<exceljs.Workbook|void>
    
}