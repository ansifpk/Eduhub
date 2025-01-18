import { Router } from "express";
import { instructorController } from "./injections/injections";
import upload from '../middlewares/multer'
import { isAuth, isInstructor } from "../middlewares/authCheck";

export function InstructorRouter(router:Router){
   router.patch("/register",isAuth,upload,async(req,res,next)=>{
          try {
            instructorController.register(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })
   router.get("/ratings/:userId",isInstructor,upload,async(req,res,next)=>{
          try {
            instructorController.ratings(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })
}