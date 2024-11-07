
import { Router } from "express";
import { adminControleer } from "./injections/injection";


export function AdminRoute(router:Router){
        router.post("/login",async(req,res,next)=>{
            adminControleer.adminLogin(req,res,next)
        })
        router.post("/students",async(req,res,next)=>{
            adminControleer.showStudents(req,res,next)
        })
        router.patch("/blockStudents/:userId",async(req,res,next)=>{
            adminControleer.blockStudent(req,res,next)
        })
        router.post("/instructors",async(req,res,next)=>{
            adminControleer.showInstructors(req,res,next)
        })
        router.patch("/blockInstructors/:instructorId",async(req,res,next)=>{
            adminControleer.blockInstructor(req,res,next)
        })
        router.patch("/editProfile",async(req,res,next)=>{
            adminControleer.editProfile(req,res,next)
        })
}