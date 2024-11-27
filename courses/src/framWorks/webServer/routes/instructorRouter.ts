import { NextFunction, Request, Response, Router } from "express";

import { PutObjectCommand, S3Client,GetObjectCommand ,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto'
import dotenv from 'dotenv'
import sharp from 'sharp'
import upload from '../../webServer/midllewares/multer';
import { instructorController } from "./injectionss/injections";
dotenv.config();

if(!process.env.BUCKET_ACCESS_KEY){
    throw new Error("hi")
}
if(!process.env.BUCKET_REGION){
    throw new Error("hi")
}
if(!process.env.BUCKET_SECRET_KEY){
    throw new Error("hi")
}
if(!process.env.BUCKET_NAME){
    throw new Error("hi")
}


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion, 
   })



export function InstructorRouter(router:Router){
    router.post("/createCourse",upload,async(req:Request,res:Response,next:NextFunction)=>{
        try {
           instructorController.createCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.get("/getCourses/:instructorId",async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.getCourses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.get("/allCourses",async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.allCourses(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.patch("/listCourses/:courseId",async(req:Request,res:Response,next:NextFunction)=>{
        try { 
           instructorController.listCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
    router.patch("/editCourse",upload,async(req:Request,res:Response,next:NextFunction)=>{
        try { 

           
           instructorController.editCourse(req,res,next)
        } catch (error) {
        console.error(error)          
        }
    
    }) 
}