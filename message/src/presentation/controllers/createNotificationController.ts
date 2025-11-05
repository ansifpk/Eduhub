import { NextFunction, Request, Response } from "express";
import { CreateNotification } from "../../application/useCase/createNotification";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class CreateNotificationController implements IController {
    constructor(private readonly _userUseCase:CreateNotification) {
        
    }

    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
       try {
               
                const {recipientId,senderId} = req.body;
                const notifications = await this._userUseCase.execute({recipientId,senderId,next})
                if(notifications){
                    res.status(StatusCodes.CREATED).send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
    }
}