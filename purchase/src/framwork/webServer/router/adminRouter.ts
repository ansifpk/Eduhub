import { Router } from "express";
import { adminController } from "./injectes/injectes";


export function AdminRouter(router:Router){
    router.get("/subscription",async(req,res,next)=>{
        adminController.getSubscriptions(req,res,next);
    })
    router.post("/subscription",async(req,res,next)=>{ 
        adminController.createSubscription(req,res,next);
    })
    router.patch("/subscription/:subscriptionId",async(req,res,next)=>{
        adminController.editSubscription(req,res,next);
    })
    router.delete("/subscription/:subscriptionId",async(req,res,next)=>{
        adminController.deleteSubscription(req,res,next);
    })
    router.get("/salesReports",async(req,res,next)=>{
        adminController.salesReports(req,res,next);
    })
    router.get("/order",async(req,res,next)=>{
        adminController.getOrders(req,res,next);
    })
    router.get("/getOrders/:start/:end",async(req,res,next)=>{
        adminController.getOrdersForChart(req,res,next);
    });
}