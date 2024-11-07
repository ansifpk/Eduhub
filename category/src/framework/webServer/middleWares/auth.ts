import { NextFunction, Request, Response } from "express";
import jwt from'jsonwebtoken';
interface CustomReq extends Request{
  user?:{userId:string};
}
export const isAuthenticated = async (req:CustomReq,res:Response,next:NextFunction) => {
  
   const authTokenInHeaders = req.headers['authorization']
   const refreshTokenInHeaders = req.headers['x-refresh-token']
  //  console.log("from midldleware auth",req.headers);
  //  console.log("from midldleware refresh",authTokenInHeaders,refreshTokenInHeaders );
   
} 