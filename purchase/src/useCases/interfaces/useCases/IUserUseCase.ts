import { NextFunction } from "express";
// import { ICourse } from "../../../entities/types/course";
import { ICourse } from "../../../entities/course";
import { IOrder } from "../../../entities/order";
import { Iuser } from "../../../entities/user";

export interface IUserUseCase{
    createOrder(data:{courseId:string,user:Iuser,order:IOrder},next:NextFunction):Promise<ICourse|void>
    fetchOrders(userId:string,next:NextFunction):Promise<ICourse[]|void>
}