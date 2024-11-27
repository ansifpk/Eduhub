import { Router } from "express";
import { instructorController } from "./injectes/injectes";


export function InstructorRouter(router:Router){
    router.get("/orders",async(req,res,next)=>{
        instructorController.orders(req,res,next);
    })
}