import { Router } from "express";
import { chatController } from "./injection/injection";


export function ChatRoute(router:Router){
    try {
        router.post("/",async(req,res,next)=>{
            console.log("post chat");
            chatController.createChat(req,res,next)
        })
        router.get("/:userId",async(req,res,next)=>{
            console.log("get mesaage1");
            chatController.findUserChats(req,res,next)
        })
        router.get("/privetChat/:senterId/:recieverId",async(req,res,next)=>{
            console.log("get mesaage");
            chatController.findChate(req,res,next)
        })
    } catch (error) {
        console.error(error)
    }
}