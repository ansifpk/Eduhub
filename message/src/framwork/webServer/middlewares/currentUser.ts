import { NextFunction, Request, Response } from "express";

interface UserPayload{
    id:string;
    email:string;

}
declare global {
    namespace Express{
        interface Request{
            currentUser?:UserPayload;
        }
    }
}

export const currentUser =(req:Request,res:Response,next:NextFunction)=>{
    if(!req.currentUser?.id){
       return next();
    }
}