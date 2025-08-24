import { Router } from "express";
import { chatController } from "./injection/injection";


export function ChatRoute(router:Router){
    try {
        router.post("/",async(req,res,next)=>{
            
            chatController.createChat(req,res,next)
        })
        router.get("/",async(req,res,next)=>{
            chatController.findUserChats(req,res,next)
        })
        router.get("/privetChat/:chatId",async(req,res,next)=>{
            chatController.findChate(req,res,next)
        })
      
    } catch (error) {
        console.error(error)
    }
}