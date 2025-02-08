import { Router } from "express";
import { instructorController } from "./injections/injection";
import { isAuth, isInstructor } from "../middlewares/auth";


export function InstructorRouter(router:Router){
    router.post('/login',async(req,res,next)=>{
        instructorController.instructorLogin(req,res,next)
    })
    router.patch('/editProfile',isAuth,async(req,res,next)=>{
        instructorController.editProfile(req,res,next)
    })
    router.post('/register',isAuth,async(req,res,next)=>{
        instructorController.register(req,res,next)
    });
    router.get("/getStudents",isInstructor,async(req,res,next)=>{
        instructorController.getStudnets(req,res,next)
    })
    router.post("/refresh-token", async (req, res, next) => {
        instructorController.checkTockens(req, res, next);
    });
    router.post("/logout", async (req, res, next) => {
        instructorController.logout(req, res, next);
      });
}