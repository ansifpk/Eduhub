import { Router } from "express";
import { userController } from "./injectes/injectes";


export function UserRouter(router:Router){
    router.post("/createOrder",async(req,res,next)=>{
        
        console.log("yeeeeeehhhh");
        
        userController.createOrder(req,res,next);
    })
    router.get("/puchasedCourses/:userId",async(req,res,next)=>{
        userController.puchasedCourses(req,res,next);
    })
}