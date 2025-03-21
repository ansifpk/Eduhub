import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userModel } from "../../db/mongoDB/models/userModel";
import { NotAuthorizedError } from "@eduhublearning/common";


dotenv.config();

interface User{
  id:string,
  iat:number
}

export const isAuth = async (req:Request,res:Response,next:NextFunction)=>{ 
   try {
    if(!req.cookies){
   
      throw new NotAuthorizedError()
     
     } 
     if(!req.cookies.accessToken){
     
      throw new NotAuthorizedError()
  
     } 
      const check = jwt.verify(req.cookies.accessToken,process.env.JWT_ACCESSKEY!) as User;
      if(check){
        const user = await userModel.findOne({_id:check.id});
        if(user){
           if(user.isBlock){
            throw new NotAuthorizedError()
     
           }
           next();
        }else{
  
          throw new NotAuthorizedError()
          
        }
      }else{
        
        throw new NotAuthorizedError()
       
      } 
   } catch (error) {
    console.error(error)
     next(error)
   }
}

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{

    try {
     
      if(!req.cookies){
        console.log("1");
        throw new NotAuthorizedError()
        
       } 
      if(!req.cookies.accessAdminToken){
        console.log("illaa");
        
        throw new NotAuthorizedError()
   
       } 
      const check = jwt.verify(req.cookies.accessAdminToken,process.env.JWT_ACCESSKEY!) as User;
      if(!check){
        throw new NotAuthorizedError()
        
      }
      const user = await userModel.findOne({_id:check.id});
        if(!user){
          throw new NotAuthorizedError()
     
        }
        if(user.isAdmin){
           next()
        }else{
          throw new NotAuthorizedError()
      
        }
    } catch (error) {
      console.error(error)
      next(error)
    }
      
      
}

export const isInstructor = async (req:Request,res:Response,next:NextFunction)=>{

        try {
          if(!req.cookies){
            throw new NotAuthorizedError()
      
           } 
          if(!req.cookies.accessInstructorToken){
            throw new NotAuthorizedError()
          
           } 
          const check = jwt.verify(req.cookies.accessInstructorToken,process.env.JWT_ACCESSKEY!) as User;
          if(!check){
            throw new NotAuthorizedError()
            
          }
          const user = await userModel.findOne({_id:check.id});
            if(!user){
              throw new NotAuthorizedError()
            
            }
            if(user.isBlock){
              throw new NotAuthorizedError()
            
            }
            if(user.isInstructor){
               next()
            }else{
              throw new NotAuthorizedError()
            
            }
        } catch (error) {
          console.error(error)
          next(error)
        }
          
          
}


