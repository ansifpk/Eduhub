import { Router } from "express";
import { instructorController } from "./injectionss/injections";

export function InstructorRouter(router:Router){
    router.post("/createCourse",async(req,res,next)=>{
        console.log('createCourse',req.body);
        
        // instructorController.createCourse(req,res,next);
    })
}