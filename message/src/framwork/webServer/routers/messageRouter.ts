import { Router } from "express";
import {  messageController } from "./injection/injection";


export function MessageRoute(router:Router){
    try {

        router.get("/:chatId",async(req,res,next)=>{
            messageController.getMessages(req,res,next)
        })
      
        router.post("/",async(req,res,next)=>{
            messageController.createMessage(req,res,next)
        })

    } catch (error) {
        console.error(error)
    }
}