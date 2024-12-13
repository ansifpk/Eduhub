import { NextFunction, Request, Response, Router } from "express";

import { PutObjectCommand, S3Client,GetObjectCommand ,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto'
import dotenv from 'dotenv'
import sharp from 'sharp'
import upload from '../../webServer/midllewares/multer';
import { instructorController } from "./injectionss/injections";
import { isInstructor } from "../midllewares/isAuth";
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
    router.get("/getCourses/:instructorId",isInstructor,async(req:Request,res:Response,next:NextFunction)=>{
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
            // console.log(req.body);
            
           
           instructorController.editCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
}