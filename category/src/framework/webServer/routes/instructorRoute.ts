import { Router } from "express";
import { instructorController } from "./injections/injection";

export function InstructorRouter(router:Router){
    router.get("/category",async(req,res,next)=>{       
        instructorController.fechAllCategory(req,res,next)
    })
}