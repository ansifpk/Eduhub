import { Router } from "express";
import { adminController } from "./injectionss/injections";
import { isAdmin } from "../midllewares/isAuth";

export function AdminRouter(router:Router){
     router.get("/getCourses",isAdmin,(req,res,nex)=>{
        adminController.getCourses(req,res,nex)
     })
}