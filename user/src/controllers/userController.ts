import { NextFunction, Request, Response } from "express";
import { userUseCase } from "../framwork/webServer/routes/injections/injections";
import { IUserUseCase } from "../useCases/interfaces/useCasesInterfaces/IuserUseCases";


export class UserController{
   
    constructor(
        private userUseCase:IUserUseCase
    ){ }
    async createProfile(req:Request,res:Response,next:NextFunction){
       const user = await this.userUseCase.createProfile(req.body,next)
    }
    async userProfile(req:Request,res:Response,next:NextFunction){
        //  const userProfile =  await this.userUseCase.userProfile(req.body)
    }
}