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
        
        console.log("controll statrt");
        
        const course =  await this.userUseCase.createOrder({courseId:req.body.orderData._id,user:req.body.orderData.user,order:req.body},next) 
        if(course){
            console.log(course,"last");
            
            await new OrderCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                _id:  course._id!,
                userId: req.body.orderData.user.id 
            }) 
            return res.send({success:true,order:course})
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