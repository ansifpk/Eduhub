import { Request, Response, NextFunction } from "express";
import { LoginUser } from "../../../application/user/loginUser";
import { IController } from "../../../shared/IController";




export class LoginUserController implements IController{
    constructor(private readonly _useCase:LoginUser){}
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
      const {email,password} = req.body;
      const userAndTokens = await this._useCase.execute(
        {email,
        password,
        next}
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
        res.send(userAndTokens);
      }
    } catch (err) {
      console.error(err);
    }
    }
    
}