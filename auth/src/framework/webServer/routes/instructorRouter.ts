import { Router } from "express";
import { instructorController } from "./injections/injection";
import { isAuth, isInstructor } from "../middlewares/auth";


export function InstructorRouter(router:Router){
    router.patch('/editProfile',isAuth,async(req,res,next)=>{
        instructorController.editProfile(req,res,next)
    })
    router.post('/register',isAuth,async(req,res,next)=>{
        // console.log(req.body);
        
        instructorController.register(req,res,next)
    });
    router.get("/getStudents",isInstructor,async(req,res,next)=>{
        instructorController.getStudnets(req,res,next)
    })
}