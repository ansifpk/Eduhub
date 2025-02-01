import { Router } from "express";
import { instructorController } from "./injectes/injectes";


export function InstructorRouter(router:Router){

    router.get("/subscription",async(req,res,next)=>{
        instructorController.getSubscriptions(req,res,next);
    })
    router.get("/subscription/:userId",async(req,res,next)=>{
        instructorController.instructorSubscriptions(req,res,next);
    })
    router.get("/subscribe/:userId",async(req,res,next)=>{
        instructorController.getPlans(req,res,next);
    })
    router.get("/subscribe/:method/:userId",async(req,res,next)=>{
        instructorController.purchaseSubscription(req,res,next);
    })
    router.get("/customer/:customerId",async(req,res,next)=>{ 
        instructorController.subscriptionDetailes(req,res,next);
    })
     
    router.post("/subscription/:userId",async(req,res,next)=>{
        instructorController.createSubscription(req,res,next);
    })

    router.patch("/subscription/:subscriptionId",async(req,res,next)=>{
        instructorController.editSubscription(req,res,next);
    })

    router.get("/order",async(req,res,next)=>{
        instructorController.getOrders(req,res,next);
    })
    router.get("/order/:userId",async(req,res,next)=>{
        instructorController.instructorOrders(req,res,next);
    })
    router.get("/salesReports",async(req,res,next)=>{
        instructorController.salesReports(req,res,next);
    })

}