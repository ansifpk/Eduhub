import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ICreateMessage } from "../../domain/interfaces/ICreateMessage";

export class CreateMessageController implements IController {
    constructor(private readonly _useCase:ICreateMessage){}

    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
       try {
           const {chatId,senderId,text} = req.body;
            const message = await this._useCase.execute({chatId,senderId,text})
            if(message){
                res.status(StatusCodes.CREATED).send({success:true,message:message});
            }
       } catch (error) {
        next(error)
       }
    }
}