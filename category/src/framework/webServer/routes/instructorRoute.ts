import { Router } from "express";
import { categoryController } from "./injections/injection";

export function InstructorRouter(router:Router){
    router.get("/category",async(req,res,next)=>{       
        categoryController.fechAllCategory(req,res,next)
    })
}