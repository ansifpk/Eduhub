import { NextFunction, Request, Response } from "express";
import { ResetPassword } from "../../../application/user/resetPassword";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";


export class ResetPasswordController implements IController{
    constructor(private readonly _useCase:ResetPassword){}
    public async handle(req:Request,res:Response,next:NextFunction): Promise<any> {
       try {
    const {userId} = req.params
    const {password,newPassword,conPassword} = req.body
     const data = await this._useCase.execute({userId,password,newPassword,conPassword, next});
     if (data) {
        res.status(StatusCodes.OK).send({ success: true });
     }
   } catch (error) {
    console.error(error);
   }
    }

}