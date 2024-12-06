
import { Router } from "express";
import { adminControleer } from "./injections/injection";
import { isAdmin } from "../middlewares/auth";


export function AdminRoute(router:Router){
    try {
        router.post("/login",async(req,res,next)=>{
            adminControleer.adminLogin(req,res,next)
        })
        router.get("/students",async(req,res,next)=>{
            adminControleer.showStudents(req,res,next)
        })
      
        router.get("/instructors",async(req,res,next)=>{
            adminControleer.showInstructors(req,res,next)
        })
        router.patch("/blockUser/:userId",async(req,res,next)=>{
         
            adminControleer.blockUser(req,res,next)
        })
        router.patch("/editProfile",async(req,res,next)=>{
            adminControleer.editProfile(req,res,next)
        })
    } catch (error) {
        console.error("hierr",error)
    }
        
}