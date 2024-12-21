import {Request,Response, NextFunction } from "express";



export class ChatController{
   
   async createChat(req:Request,res:Response,next:NextFunction){
         try {
            console.log("create chats",req.body);
         } catch (error) {
            console.error(error)
         }
    }
    async findUserChats(req:Request,res:Response,next:NextFunction){
        try {
                console.log("user chates",req.params);
                
        } catch (error) {
        console.error(error)
        }
    }
   async findChate(req:Request,res:Response,next:NextFunction){
         try {
            console.log("find Chat",req.params);
         } catch (error) {
            console.error(error)
         }
    }
}