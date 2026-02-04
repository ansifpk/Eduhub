import { Request, Response, NextFunction } from "express";
import { GooogleLogin } from "../../../application/user/googleLogin";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";

export class GoogleLoginController implements IController {
    constructor(private readonly _useCase:GooogleLogin) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
       const {email,name,password} = req.body;
       console.log("cjhe",req.body);
       
      //  return ;
      const userAndToken = await this._useCase.execute(
       { email,
        name,
        password,
        next}
      );
      if (userAndToken) {
        res.cookie('accessToken',userAndToken.token.accessToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:'strict',
          maxAge: 15 * 60 * 1000
       });
        res.cookie('refreshToken',userAndToken.token.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:'strict',
          maxAge:30 * 24 * 60 * 60 * 1000
       });

          res.status(StatusCodes.OK).send({ success: true, user: userAndToken });
      }
    } catch (err) {
      console.error(err);
    }
    }
}