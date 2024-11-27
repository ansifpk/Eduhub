import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";


export class UserController{
    constructor(
        private userUseCase:IUserUseCase
    ){}
    async createOrder(req:Request,res:Response,next:NextFunction){
        console.log(req.body.orderData);
        const order =  await this.userUseCase.createOrder(req.body.orderData,next)
        if(order){
            return res.send({success:true,order:order})
        }
    }
    async puchasedCourses(req:Request,res:Response,next:NextFunction){
        const {userId} = req.params
        
        const orders =  await this.userUseCase.fetchOrders(userId,next)
        if(orders){
            return res.send({success:true,orders:orders})
        }
    }
}