import { NextFunction } from "express";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";
import { IOrder } from "../../../entities/order";

export interface IUserUseCase{
    createOrder(data:IOrder,next:NextFunction):Promise<IOrder|void>
    fetchOrders(userId:string,next:NextFunction):Promise<ICourse[]|void>
}