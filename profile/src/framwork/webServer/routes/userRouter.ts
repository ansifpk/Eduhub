import { Router } from "express";
import { userController } from "./injections/injections";
import { isAuth } from "../middlewares/authCheck";

export function UserRouter(router:Router){
   router.get("/profile",isAuth,async(req,res,next)=>{
          try {
            userController.userProfile(req,res,next)
          } catch (error) {
            console.error(error)
          }
   })

}