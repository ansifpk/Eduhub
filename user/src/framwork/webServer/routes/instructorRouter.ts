import { Router } from "express";
import { instructorController } from "./injections/injections";
import upload from '../../webServer/middlewares/multer'

export function InstructorRouter(router:Router){
   router.post("/register",upload,async(req,res,next)=>{
          try {
            
            instructorController.register(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })
}