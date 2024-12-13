import { Router } from "express";
import { instructorController } from "./injections/injections";
import upload from '../middlewares/multer'
import { isAuth } from "../middlewares/authCheck";

export function InstructorRouter(router:Router){
   router.patch("/register",isAuth,upload,async(req,res,next)=>{
          try {
            
            instructorController.register(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })
}