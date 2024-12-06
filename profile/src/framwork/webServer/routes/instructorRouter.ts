import { Router } from "express";
import { instructorController } from "./injections/injections";
import upload from '../middlewares/multer'

export function InstructorRouter(router:Router){
   router.patch("/register",upload,async(req,res,next)=>{
          try {
            // console.log("ivade");
            
            instructorController.register(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })
}