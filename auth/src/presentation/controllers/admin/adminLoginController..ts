import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IAdminLogin } from "../../../domain/interfaces/admin/useCases/IAdminLogin";

export class AdminLoginController implements IController {
    constructor(private readonly _useCase:IAdminLogin) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        const {email,password} = req.body;
        const adminAndToken = await this._useCase.execute({email,password});
        if(adminAndToken){

          res.cookie('accessAdminToken',adminAndToken.token.accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
            path:"/",
            maxAge: 15 * 60 * 1000
         });
          res.cookie('refreshAdminToken',adminAndToken.token.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
            path:"/",
            maxAge:30 * 24 * 60 * 60 * 1000
         });
          res.status(StatusCodes.OK).send(adminAndToken)
        }
       } catch (error) {
         next(error)
       }
    }
}