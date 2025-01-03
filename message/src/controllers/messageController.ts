import {Request,Response, NextFunction } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCasesInterfaces/IuserUseCas";



export class MessageController{
   constructor(
      private userUseCase:IUserUseCase
   ){}
   async createMessage(req:Request,res:Response,next:NextFunction){
         try {
           
            const {chatId,senderId,text} = req.body;
            const message = await this.userUseCase.insertMessage(chatId,senderId,text,next)
            if(message){
               return res.send({success:true,message:message});
            }
         } catch (error) {
            console.error(error)
         }
    }
    async getMessages(req:Request,res:Response,next:NextFunction){
        try {
                const {chatId}  = req.params
                const messages = await this.userUseCase.fetchMessages(chatId);
  
                if(messages){
                  return res.send({success:true,messages:messages})
                }
        } catch (error) {
        console.error(error)
        }
    }
}