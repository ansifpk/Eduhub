import { NextFunction, Request, Response } from "express";
import { MarkAsRead } from "../../application/useCase/markAsRead";
import { IController } from "../../shared/IController";

export class MarkAsReadController implements IController {
    constructor(private readonly _useCase:MarkAsRead) {
        
    }

    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
                const {senderId,userId} = req.params;
                const notifications = await this._useCase.execute({userId,senderId,next})
                if(notifications){
                   res.send({success:true,notifications:notifications});
                }
             } catch (error) {
                console.error(error)
             }
    }
}