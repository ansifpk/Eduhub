import { Router } from "express";
import { userController } from "./injectes/injectes";


export function UserRouter(router:Router){
  
    router.get("/puchasedCourses/:userId",async(req,res,next)=>{
        userController.puchasedCourses(req,res,next);
    })

    router.get("/subscription/:instructorId",async(req,res,next)=>{
        userController.getSubscriptions(req,res,next);
    })
    router.post("/subscription/:subscriptionId",async(req,res,next)=>{
        userController.purchaseSubscription(req,res,next);
    })

    router.get("/subscribe/:userId",async(req,res,next)=>{
        userController.purchasedSubscriptions(req,res,next);
    })
    router.get("/customer/:customerId",async(req,res,next)=>{ 
        userController.subscriptionDetailes(req,res,next);
    })
}