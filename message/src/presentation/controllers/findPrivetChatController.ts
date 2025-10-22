import { NextFunction, Request, Response } from "express";
import { GetPrivetChate } from "../../application/useCase/getPrivetChate";

export class FindPrivetChatController {
    constructor(private readonly _useCase:GetPrivetChate) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {chatId} = req.params
            const checkChat = await this._useCase.execute({chatId,next});
            if(checkChat){
               res.send({success:true,chat:checkChat})
            }
         } catch (error) {
            console.error(error)
         }
    }
}