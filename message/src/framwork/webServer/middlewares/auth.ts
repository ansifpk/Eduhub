import { NextFunction, Request, Response } from "express";
import jwt from'jsonwebtoken';
import ErrorHandler from "../../../useCases/middlewares/errorHandler";
import { userModel } from "../../db/mongodb/models/userModel";
import dotenv from 'dotenv';
dotenv.config() 

interface User{
  id:string,
  iat:number
}

export const isAuth = async (req:Request,res:Response,next:NextFunction)=>{ 

  
  if(!req.session){
    return next(new ErrorHandler(400,"Tocken Expired"))
   } 
  if(!req.session.accessToken){
    return next(new ErrorHandler(400,"Tocken Expired"))
   } 
   
    const check = jwt.verify(req.session?.accessToken,process.env.JWT_ACCESSKEY!) as User;
    if(check){
      const user = await userModel.findOne({_id:check.id});
      if(user){
         if(user.isBlock){
          return next(new ErrorHandler(403,"You are blocked by Admin"))
         }
         next();
      }else{
        next(new ErrorHandler(400,"Tocken Expired"))
      }
    }else{
      next(new ErrorHandler(400,"Tocken Expired"))
    } 
}

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{

  try {
  
    if(!req.session){
      return next(new ErrorHandler(400,"Tocken Expired"))
     } 
    if(!req.session.accessToken){
      return next(new ErrorHandler(400,"Tocken Expired"))
     } 
    const check = jwt.verify(req.session.accessToken,process.env.JWT_ACCESSKEY!) as User;
    if(!check){
      return next(new ErrorHandler(400,"Tocken Expired"))
    }
    const user = await userModel.findOne({_id:check.id});
      if(!user){
        return next(new ErrorHandler(400,"Tocken Expired"))
      }
      if(user.isAdmin){
         next()
      }else{
        return next(new ErrorHandler(400,"You are not admin"))
      }
  } catch (error) {
    throw new Error("Admin not login")
  }
    
    
  }
export const isInstructor = async (req:Request,res:Response,next:NextFunction)=>{

  try {
    if(!req.session){
      return next(new ErrorHandler(400,"Tocken Expired"))
     } 
     if(!req.session.accessToken){
      return next(new ErrorHandler(400,"Tocken Expired"))
     } 
    const check = jwt.verify(req.session.accessToken,process.env.JWT_ACCESSKEY!) as User;
    if(!check){
      return next(new ErrorHandler(400,"Tocken Expired"))
    }
    const user = await userModel.findOne({_id:check.id});
      if(!user){
        return next(new ErrorHandler(400,"Tocken Expired"))
      }
      if(user.isBlock){
        return next(new ErrorHandler(403,"You are blocked by Admin"))
      }
      if(user.isInstructor){
         next()
      }else{
        return next(new ErrorHandler(400,"You are not Instructor"))
      }
  } catch (error) {
    throw new Error("Admin not login")
  }
    
    
  }