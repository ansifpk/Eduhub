import {Request,Response, NextFunction } from "express";



export class MessageController{
   
   async createMessage(req:Request,res:Response,next:NextFunction){
         try {
            console.log("create message",req.body);
         } catch (error) {
            console.error(error)
         }
    }
    async getMessages(req:Request,res:Response,next:NextFunction){
        try {
                console.log("user messages",req.params);
                
        } catch (error) {
        console.error(error)
        }
    }
}