import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCases/IadminUseCase";


export class AdminController{
    constructor(private adminUseCase:IAdminUseCase){}

    async createCourse(req:Request,res:Response,next:NextFunction){
        console.log(req.body,"in instrucontroll");
      this.adminUseCase.createCourse(req.body)
    }
    async editCourse(req:Request,res:Response,next:NextFunction){
      
    }
    async listCourse(req:Request,res:Response,next:NextFunction){
      
    }
    
}