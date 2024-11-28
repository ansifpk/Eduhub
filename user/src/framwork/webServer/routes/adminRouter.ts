import { Router } from "express";
import { adminController } from "./injections/injections";

export function AdminRouter(router:Router){

    router.get("/instructors",async(req,res,next)=>{
        try {
          adminController.fetchInstructors(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })
 router.get("/students",async(req,res,next)=>{
        try {
            adminController.fetchStudents(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })

 router.patch("/instructorAprovel",async(req,res,next)=>{
        try {          
            adminController.instructorAprovel(req,res,next)
        } catch (error) {
          console.error(error)
        }
 })
}