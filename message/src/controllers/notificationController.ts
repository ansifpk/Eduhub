import {Response,Request, NextFunction } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCasesInterfaces/IuserUseCas";


export class NotificationController{
    constructor(
      private userUseCase:IUserUseCase
    ){}

     async createNotifications(req:Request,res:Response,next:NextFunction){
             try {
               
                const {recipientId,senderId} = req.body;
                const notifications = await this.userUseCase.createNotifications(recipientId,senderId,next)
                if(notifications){
                   return res.send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
        }
     async getNotifications(req:Request,res:Response,next:NextFunction){
             try {
               
                const {recipientId} = req.params;
                const notifications = await this.userUseCase.getNotifications(recipientId,next)
                if(notifications){
                   return res.send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
        }

     async markAsRead(req:Request,res:Response,next:NextFunction){
             try {
                const {senderId,userId} = req.params;
                const notifications = await this.userUseCase.markAsRead(userId,senderId,next)
                if(notifications){
                   return res.send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
        }



}