import { NextFunction, Request, Response } from "express";
import { GetNotification } from "../../application/useCase/getNotification";
import { IController } from "../../shared/IController";

export class GetNotificationController implements IController {
    constructor(private readonly _useCase:GetNotification) {
        
    }

    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
                const {recipientId} = req.params;
                const notifications = await this._useCase.execute({recipientId,next})
                if(notifications){
                    res.send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
    }
}