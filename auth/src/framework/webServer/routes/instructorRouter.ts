import { Router } from "express";
import { instructorController } from "./injections/injection";
import { isAuth } from "../middlewares/auth";


export function InstructorRouter(router:Router){
    router.patch('/editProfile',isAuth,async(req,res,next)=>{
        instructorController.editProfile(req,res,next)
    })
    router.post('/register',async(req,res,next)=>{
        instructorController.register(req,res,next)
    });
}