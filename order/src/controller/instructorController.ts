import { NextFunction, Request, Response } from "express";
import { IInstructorUseCase } from "../useCases/interfaces/useCases/IInstrctorUseCase";

export class InstructorController{
    constructor(
        private instructorUseCase:IInstructorUseCase
    ){}
    async orders(req:Request,res:Response,next:NextFunction){
        const order =  await this.instructorUseCase.orders()
        if(order){
            return res.send({success:true,order:order})
        }
    }
}