import { NextFunction, Request, Response } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IResetPassword } from "../../../domain/interfaces/user/useCases/IResetPassword";


export class ResetPasswordController implements IController{
    constructor(private readonly _useCase:IResetPassword){}
    public async handle(req:Request,res:Response,next:NextFunction): Promise<any> {
       try {
    const {userId} = req.params
    const {password,newPassword,conPassword} = req.body
     const data = await this._useCase.execute({userId,password,newPassword,conPassword});
     if (data) {
        res.status(StatusCodes.OK).send({ success: true });
     }
   } catch (error) {
    next(error);
   }
    }

}