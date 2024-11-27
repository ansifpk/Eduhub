
import { Router } from "express";
import { adminControleer } from "./injections/injection";
import { isAdmin } from "../middlewares/auth";


export function AdminRoute(router:Router){
    try {
        router.post("/login",async(req,res,next)=>{
            adminControleer.adminLogin(req,res,next)
        })
        router.get("/students",isAdmin,async(req,res,next)=>{
            adminControleer.showStudents(req,res,next)
        })
        router.patch("/blockStudents/:userId",isAdmin,async(req,res,next)=>{
            adminControleer.blockStudent(req,res,next)
        })
        router.get("/instructors",isAdmin,async(req,res,next)=>{
            adminControleer.showInstructors(req,res,next)
        })
        router.patch("/blockInstructors/:instructorId",isAdmin,async(req,res,next)=>{
            adminControleer.blockInstructor(req,res,next)
        })
        router.patch("/editProfile",isAdmin,async(req,res,next)=>{
            adminControleer.editProfile(req,res,next)
        })
    } catch (error) {
        console.error("hierr",error)
    }
        
}