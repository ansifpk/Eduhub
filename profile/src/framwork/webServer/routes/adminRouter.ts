import { Router } from "express";
import { adminController } from "./injections/injections";
import { isAdmin } from "../middlewares/authCheck";

export function AdminRouter(router:Router){

    router.get("/instructors",isAdmin,async(req,res,next)=>{
        try {         
          adminController.fetchInstructors(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })
 router.get("/students",isAdmin,async(req,res,next)=>{
        try {
            adminController.fetchStudents(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })

 router.patch("/instructorAprovel",isAdmin,async(req,res,next)=>{
        try {          
            adminController.instructorAprovel(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })

 router.get("/top5Instructors",async(req,res,next)=>{
  adminController.top5Instructors(req,res,next);
})

}