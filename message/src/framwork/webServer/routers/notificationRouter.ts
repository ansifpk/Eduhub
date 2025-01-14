import { Router } from "express";
import { notificationController } from "./injection/injection";



export function NotificationRoute(router:Router){
    try {

        router.get("/:recipientId",async(req,res,next)=>{
            console.log("get not",req.params);
            notificationController.getNotifications(req,res,next)
        })
      
        router.post("/",async(req,res,next)=>{
            console.log('re.body',req.body);
            notificationController.createNotifications(req,res,next)
        })

    } catch (error) {
        console.error(error)
    }
}