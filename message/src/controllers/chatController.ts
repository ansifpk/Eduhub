import {Request,Response, NextFunction } from "express";
import { IUserUseCase } from "../useCases/interfaces/useCasesInterfaces/IuserUseCas";



export class ChatController{
    constructor (
      private userUseCase:IUserUseCase
    ){}
   async createChat(req:Request,res:Response,next:NextFunction){
         try {
            const {userId,recipientId,role} = req.body;
            console.log(req.body);
            
            const chat = await this.userUseCase.createChat(userId,recipientId,role,next);
            if(chat){
              return res.send({success:true,chat:chat})
            }
         } catch (error) {
            console.error(error)
         }
    }
    async findUserChats(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.query;         
            const userChats = await this.userUseCase.fetchChats(userId as string,next)
            if(userChats){
               return res.send({success:true,chats:userChats})
            }
        } catch (error) {
        console.error(error)
        }
    }
   async findChate(req:Request,res:Response,next:NextFunction){
         try {
           console.log("hiiii");
           
            const {chatId} = req.params
            const checkChat = await this.userUseCase.privetChat(chatId,next);
            if(checkChat){
               return res.send({success:true,chat:checkChat})
            }
         } catch (error) {
            console.error(error)
         }
    }
}