import { NextFunction, Request, Response } from "express";
import { IController } from "../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IFetchChats } from "../../domain/interfaces/IFetchChats";


export class FindUserChatsController implements IController {
    constructor(private readonly _useCase:IFetchChats) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {userId} = req.query;  
            const userChats = await this._useCase.execute({userId:userId as string})
            if(userChats){
               res.status(StatusCodes.OK).send({success:true,chats:userChats})
            }
        } catch (error) {
           next(error)
        }
    }

}