import { Router } from "express";
import { instructorController } from "./injections/injection";
import { isAuth } from "../middlewares/auth";


export function InstructorRouter(router:Router){
    router.patch('/editProfile',async(req,res,next)=>{
        instructorController.editProfile(req,res,next)
    })
    router.post('/register',async(req,res,next)=>{
        // console.log(req.body);
        
        instructorController.register(req,res,next)
    });
    router.get("/getStudents",async(req,res,next)=>{
        instructorController.getStudnets(req,res,next)
    })
}