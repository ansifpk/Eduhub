import { Router } from "express";
import {  messageController } from "./injection/injection";


export function MessageRoute(router:Router){
    try {
       
        router.get("/:userId",async(req,res,next)=>{
            console.log("get message");
            messageController.getMessages(req,res,next)
        })
      
        router.post("/",async(req,res,next)=>{
            console.log("post message");
            messageController.createMessage(req,res,next)
        })

    } catch (error) {
        console.error(error)
    }
}