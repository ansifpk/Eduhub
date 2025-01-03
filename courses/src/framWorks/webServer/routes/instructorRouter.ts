import { NextFunction, Request, Response, Router } from "express";
import dotenv from 'dotenv'
import upload from '../../webServer/midllewares/multer';
import { instructorController } from "./injectionss/injections";
import { isAuth, isInstructor } from "../midllewares/isAuth";
dotenv.config();


export function InstructorRouter(router:Router){
    router.post("/createCourse",isInstructor,upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log(req.body,req.files);
            
           instructorController.createCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.get("/getCourses",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
        try { 
            console.log("hi",req.query);
            
           instructorController.getCourses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    // router.get("/getCourses/:instructorId/:filter",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
    //     try { 
    //         console.log("hi",req.params);
            
    //     //    instructorController.getCourses(req,res,next)
    //     } catch (error) {
    //     console.error(error)          
    //     }
    
    // }) 
   
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
            console.log(req.params,req.body);
            
          instructorController.editTest(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
}