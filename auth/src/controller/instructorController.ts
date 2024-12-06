import { NextFunction, Request, Response } from "express";
import { IInstructorInterface } from "../useCase/interface/useCsesInterface/IinstructorInterface";

export class InstructorController{

    private instructorUseCase:IInstructorInterface;
    constructor(instructorUseCase:IInstructorInterface){
        this.instructorUseCase=instructorUseCase
    }
    async editProfile(req:Request,res:Response,next:NextFunction){
        const updatedUser = await this.instructorUseCase.editProfile(req.body.instructorId,req.body.email,req.body.name,next)
        if(updatedUser){
            return res.send({success:true,user:updatedUser})
        }
    }
    async register(req:Request,res:Response,next:NextFunction){
        
        
        const createdUser = await this.instructorUseCase.instructorRegister(req.body.email,req.body.name,req.body.qualification,req.body.expirience,req.body.certificat,req.body.cv,next)
        if(createdUser){
            return res.send({success:true,user:createdUser})
        }
    }
    async getStudnets(req:Request,res:Response,next:NextFunction){
        
        
        const createdUser = await this.instructorUseCase.fetchStudents()
        if(createdUser){
            return res.send({success:true,user:createdUser})
        }
    }
}