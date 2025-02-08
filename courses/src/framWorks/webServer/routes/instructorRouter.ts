import { NextFunction, Request, Response, Router } from "express";
import dotenv from 'dotenv'
import upload from '../../webServer/midllewares/multer';
import { instructorController } from "./injectionss/injections";
import { isInstructor } from "../midllewares/auth";

dotenv.config();


export function InstructorRouter(router:Router){

    router.post("/createCourse",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {
           instructorController.createCourse(req,res,next)
        } catch (error) {
           console.error(error)          
        }
    
    }) 
    router.get("/getCourses",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.getCourses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
   
    router.get("/allCourses",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.allCourses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.patch("/listCourses/:courseId",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.listCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.patch("/editCourse",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.editCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.post("/tests/:courseId",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {  
          instructorController.addTest(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 

    router.patch("/tests/:testId",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {   
          instructorController.editTest(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    }) 
    router.get("/course/:userId",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {   
          instructorController.top5Courses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    }) 
    router.get("/topRated/:userId",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {   
          instructorController.topRated(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    }) 
   
}