import { Router } from "express";
import { adminController } from "./injectionss/injections";

export function AdminRouter(router:Router){
     router.get("/getCourses",(req,res,nex)=>{
        adminController.getCourses(req,res,nex)
     })
}