// import { NextFunction, Request, Response } from "express";
// import jwt from'jsonwebtoken';
// import { userModel } from "../../db/mongoDB/models/userModel";
// import ErrorHandler from "../../../useCase/middlewares/errorHandler";
// interface CustomReq extends Request{
//   user?:{userId:string};
// }
// export const isAuthenticated = async (req:CustomReq,res:Response,next:NextFunction) => {
  
//    const authTokenInHeaders = req.headers['authorization']
//    const refreshTokenInHeaders = req.headers['x-refresh-token']
//   //  console.log("from midldleware auth",req.headers);
//   //  console.log("from midldleware refresh",authTokenInHeaders,refreshTokenInHeaders );
   
// } 
// export const isAuth = async (req:CustomReq,res:Response,next:NextFunction)=>{
//     console.log(req.body,"ivade")
//     const user = await userModel.findOne({email:req.body.email});
//     if(user?.isBlock){
//       return next(new ErrorHandler(400,"Access Denied By Admin"))
//     }else{
//       return next()
//     }
    
// }