import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCases/IUserUseCase";
import { OrderCreatedPublisher } from "../framwork/webServer/config/kafka/producer/order-created-publisher";
import kafkaWrapper from "../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { ICourse } from "../entities/course";

interface IUser{
    id:string
}

export class UserController{
    constructor(
        private userUseCase:IUserUseCase
    ){}
    async createOrder(req:Request,res:Response,next:NextFunction){
  
        const order =  await this.userUseCase.createOrder(req.body.orderData,next) 
        if(order){
            
            const {_id} = order
             console.log(order.user.id);
             
            await new OrderCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                _id: _id,
                userId: order.user.id
            }) 
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