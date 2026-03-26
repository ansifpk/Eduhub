import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGetPrivetChate } from "../../domain/interfaces/IGetPrivetChate";

export class FindPrivetChatController implements IController {
    constructor(private readonly _useCase:IGetPrivetChate) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {chatId} = req.params
            const checkChat = await this._useCase.execute({chatId});
            if(checkChat){
               res.status(StatusCodes.OK).send({success:true,chat:checkChat})
            }
         } catch (error) {
            next(error)
         }
    }
}