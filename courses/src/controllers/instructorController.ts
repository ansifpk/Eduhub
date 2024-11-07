import { NextFunction, Request, Response } from "express";
import { IInstructorUseCase } from "../useCases/interfaces/useCases/IInstructorUseCase";

export class InstructorController{
    // instructorUseCases:IInstructorUseCase
    constructor(private instructorUseCases:IInstructorUseCase){
        // this.instructorUseCases=instructorUseCases
    }
    async createCourse(req:Request,res:Response,next:NextFunction){
        console.log(req.body,"in instrucontroll");
      this.instructorUseCases.createCourse(req.body)
    }
    async editCourse(req:Request,res:Response,next:NextFunction){
      
    }
    async listCourse(req:Request,res:Response,next:NextFunction){
      
    }
}