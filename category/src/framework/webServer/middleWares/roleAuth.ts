import { NextFunction, Request, Response } from "express";
import { isAuthenticated } from "./auth";


export const isUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        isAuthenticated(req,res,next)
    } catch (err) {
         throw err
    }
}
export const isAdmin = async (req:Request,res:Response,next:NextFunction) => {
    try {
        isAuthenticated(req,res,next)
    } catch (err) {
         throw err
    }
}