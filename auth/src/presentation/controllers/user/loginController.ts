import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { ILoginUser } from "../../../domain/interfaces/user/useCases/ILoginUser";




export class LoginUserController implements IController{
    constructor(private readonly _useCase:ILoginUser){}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
      const {email,password} = req.body;
      const userAndTokens = await this._useCase.execute(
        {email,
        password}
      ); 
      if (userAndTokens) { 
        res.cookie('accessToken',userAndTokens.token.accessToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
          path:"/",
          maxAge: 15 * 60 * 1000,
       });
        res.cookie('refreshToken',userAndTokens.token.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
          path:"/",
          maxAge:30 * 24 * 60 * 60 * 1000,
       });
        res.status(StatusCodes.OK).send(userAndTokens);
      }
    } catch (err) {
      next(err);
    }
    }
    
}