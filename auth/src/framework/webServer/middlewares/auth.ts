import { NextFunction, Request, Response } from "express";
import jwt from'jsonwebtoken';
import { userModel } from "../../db/mongoDB/models/userModel";
import ErrorHandler from "../../../useCase/middlewares/errorHandler";

interface User{
  id:string,
  iat:number
}

export const isAuth = async (req:Request,res:Response,next:NextFunction)=>{
    const check = jwt.verify(req.session?.accessToken,'itsjwtaccesskey') as User;
    if(check){
      const user = await userModel.findOne({email:check.id});
      if(user?.isBlock){
        return next(new ErrorHandler(400,"Access Denied By Admin"))
      }else{
        return next()
      }
    }else{
      throw new Error("Use not login")
    } 
}

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{

try {
  if(!req.session){
    throw new Error("Admin not login")
  }
  const check = jwt.verify(req.session.accessToken,'itsjwtaccesskey') as User;
  if(!check){
    throw new Error("Admin not login")
  }
  const user = await userModel.findOne({email:check.id});
    if(!user){
      throw new Error("user not registered")
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