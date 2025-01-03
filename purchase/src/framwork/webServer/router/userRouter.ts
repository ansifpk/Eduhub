import { Router } from "express";
import { userController } from "./injectes/injectes";


export function UserRouter(router:Router){
  
    router.get("/puchasedCourses/:userId",async(req,res,next)=>{
        userController.puchasedCourses(req,res,next);
    })
}