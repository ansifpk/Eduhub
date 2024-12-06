import { NextFunction, Request, Response } from "express";
import { IInstructorUserCase } from "../useCase/interfaces/useCasesInterfaces/IinstructorUseCase";


export class InstructorController{
    private instructorUseCase:IInstructorUserCase;
    constructor(instructorUseCase:IInstructorUserCase){
        this.instructorUseCase = instructorUseCase
    }

    async fechAllCategory(req:Request,res:Response,next:NextFunction){
       try {
         const categories = await this.instructorUseCase.getAllCategories();
         if(categories){
       
            
             return res.send(categories);
         }
       } catch (error) {
        console.error(error)
       }
    }
   

}