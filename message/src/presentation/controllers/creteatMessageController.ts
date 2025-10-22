import { NextFunction, Request, Response } from "express";
import { CreateMessage } from "../../application/useCase/createMessage";

export class CreateMessageController {
    constructor(private readonly _useCase:CreateMessage){}

    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
       try {
           const {chatId,senderId,text} = req.body;
            const message = await this._useCase.execute({chatId,senderId,text,next})
            if(message){
                res.send({success:true,message:message});
            }
       } catch (error) {
        console.error(error);
       }
    }
}