import { Router } from "express";
import { userController } from "./injections/injections";

export function UserRouter(router:Router){
   router.get("/profile",async(req,res,next)=>{
          try {
            userController.userProfile(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })

}