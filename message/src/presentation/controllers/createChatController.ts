import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ICreateChatUseCase } from "../../domain/interfaces/ICreateChatUseCase";


export class CreateChatController implements IController {
    constructor(private readonly _useCase:ICreateChatUseCase) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {userId,recipientId,role} = req.body;            
           const chat = await this._useCase.execute({userId,recipientId,role})
            if(chat){
              res.status(StatusCodes.CREATED).send({success:true,chat:chat})
            }
         } catch (error) {
            next(error)
         }
    }

}