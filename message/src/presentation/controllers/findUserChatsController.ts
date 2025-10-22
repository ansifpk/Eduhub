import { NextFunction, Request, Response } from "express";
import { CreateChatUseCase } from "../../application/useCase/createChat";
import { FetchChats } from "../../application/useCase/fetchChats";


export class FindUserChatsController {
    constructor(private readonly _useCase:FetchChats) {}
    
    public async handle(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const {userId} = req.query;  
            const userChats = await this._useCase.execute({userId:userId as string,next})
            if(userChats){
               res.send({success:true,chats:userChats})
            }
        } catch (error) {
            console.error(error)
        }
    }

}