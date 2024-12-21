import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { userModel } from "../../db/mongoDB/models/userModel";
import ErrorHandler from "../../../useCases/middlewares/errorHandler";



interface User{
  id:string,
  iat:number
}

export const isAuth = async (req:Request,res:Response,next:NextFunction)=>{ 
   if(!req.session){
    return next(new ErrorHandler(400,"Tocken Expired"))
   } 
    const check = jwt.verify(req.session.accessToken,'itsjwtaccesskey') as User;
    if(check){
      const user = await userModel.findOne({_id:check.id});
      if(user){
         if(user.isBlock){
          return next(new ErrorHandler(400,"You are blocked by Admin"))
         }
         return next();
      }else{
        next(new ErrorHandler(400,"Tocken Expired"))
      }
    }else{
      next(new ErrorHandler(400,"Tocken Expired"))
    } 
}

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{

try {
  console.log(req.session);
  
  if(!req.session){
    return next(new ErrorHandler(400,"Tocken Expired"))
   } 
  const check = jwt.verify(req.session.accessToken,'itsjwtaccesskey') as User;
  if(!check){
    return next(new ErrorHandler(400,"Tocken Expired"))
  }
  console.log(check,"ji");
  
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
  // return next(new ErrorHandler(400,"You are not admin"))
  console.error(error)
}
  
  
}


export const isInstructor = async (req:Request,res:Response,next:NextFunction)=>{

  try {
    if(!req.session){
      return next(new ErrorHandler(400,"Tocken Expired"))
     } 
    const check = jwt.verify(req.session.accessToken,'itsjwtaccesskey') as User;
    if(!check){
      return next(new ErrorHandler(400,"Tocken Expired"))
    }
    const user = await userModel.findOne({_id:check.id});
      if(!user){
        return next(new ErrorHandler(400,"Tocken Expired"))
      }
      if(user.isBlock){
        return next(new ErrorHandler(400,"You are blocked by admin")) 
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