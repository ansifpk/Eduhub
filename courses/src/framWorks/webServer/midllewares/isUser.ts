import { NextFunction, Request, Response } from "express";
import jwt from'jsonwebtoken';

import ErrorHandler from "../../../useCases/middlewares/errorHandler";
import { UserModel } from "../../db/mongodb/models/userModel";

interface CustomReq extends Request{
  user?:{userId:string};
}
export const isAuthenticated = async (req:CustomReq,res:Response,next:NextFunction) => {
  
} 

export const isAuth = async (req:any,res:Response,next:NextFunction)=>{
  
  if(!req.cookie){
    throw new Error('the user not login')
  }
    const check = jwt.verify(req.session.accessToken,'itsjwtaccesskey')
    console.log(check,"checking tocken");
    if(check){
      const user = await UserModel.findOne({email:req.body.email});
      if(user?.isBlock){
        return next(new ErrorHandler(400,"Access Denied By Admin"))
      }else{
        return next()
      }
    }
    
    
}