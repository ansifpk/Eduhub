import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { ForbiddenError, StatusCodes } from "@eduhublearning/common";
import { ITokenCheck } from "../../../domain/interfaces/user/useCases/ITokenCheck";

export class TockenCheckController implements IController {
    constructor(private readonly _useCase:ITokenCheck) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {    
             if(!req.cookies.refreshToken){
               throw new ForbiddenError()
             }
             const tocken = req.cookies.refreshToken;
       
             const tockens  = await this._useCase.execute({tocken})
             if(tockens){
              
               res.cookie('accessToken',tockens.accessToken,{
                 httpOnly:true,
                 secure:process.env.NODE_ENV !== 'development',
                 sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
                 path:"/",
                 maxAge: 15 * 60 * 1000
              });
               res.cookie('refreshToken',tockens.refreshToken,{
                 httpOnly:true,
                 secure:process.env.NODE_ENV !== 'development',
                 sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
                 path:"/",
                 maxAge:30 * 24 * 60 * 60 * 1000
              });
               res.status(StatusCodes.OK).send({success:true,tockens});
             }
           } catch (error) {
             next(error)
           }
    }
}