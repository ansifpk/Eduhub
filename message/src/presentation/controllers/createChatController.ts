import { NextFunction, Request, Response } from "express";
import { CreateChatUseCase } from "../../application/useCase/createChat";
import { IController } from "../../shared/IController";


export class CreateChatController implements IController {
    constructor(private readonly _useCase:CreateChatUseCase) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {userId,recipientId,role} = req.body;
           const chat = await this._useCase.execute({userId,recipientId,role,next})
            if(chat){
              res.send({success:true,chat:chat})
            }
         } catch (error) {
            console.error(error)
         }
    }

}