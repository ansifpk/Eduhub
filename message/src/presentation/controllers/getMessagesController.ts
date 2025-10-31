import { NextFunction, Request, Response } from "express";
import { GetMessages } from "../../application/useCase/GetMessages";
import { IController } from "../../shared/IController";

export class GetMessagesController implements IController {
    constructor(private readonly _useCase:GetMessages) {
        
    }
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const {chatId}  = req.params
            console.log("hi");
            
                const messages = await this._useCase.execute({chatId,next});
                if(messages){
                  res.send({success:true,messages:messages})
                }
        } catch (error) {
            console.error(error);
        }
    }
}