import { Router } from "express";
import { chatController } from "./injection/injection";


export function ChatRoute(router:Router){
    try {
        router.post("/",async(req,res,next)=>{
             console.log("/ post",req.params);
            // chatController.createChat(req,res,next)
        })
        router.get("/",async(req,res,next)=>{
             console.log("/ post",req.params);
            // chatController.findUserChats(req,res,next)
        })
        router.patch("/:userId",async(req,res,next)=>{
               console.log("/ userid",req.params);
               
            // chatController.findUserChats(req,res,next)
        })
        router.get("/privetChat/:chatId",async(req,res,next)=>{
             console.log("/privetChat/:chatId",req.params);
            // chatController.findChate(req,res,next)
        })
      
    } catch (error) {
        console.error(error)
    }
}