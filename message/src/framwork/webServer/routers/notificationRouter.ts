import { Router } from "express";
import { notificationController } from "./injection/injection";



export function NotificationRoute(router:Router){
    try {

        router.get("/:recipientId",async(req,res,next)=>{
      
            notificationController.getNotifications(req,res,next)
        })
      
        router.post("/",async(req,res,next)=>{
   
            notificationController.createNotifications(req,res,next)
        })
        router.patch("/:userId/:senderId",async(req,res,next)=>{
           
            notificationController.markAsRead(req,res,next)
        })

    } catch (error) {
        console.error(error)
    }
}