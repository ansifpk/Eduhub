import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { StatusCodes } from "@eduhublearning/common";
import { IGoogleLogin } from "../../../domain/interfaces/user/useCases/IGoogleLogin";

export class GoogleLoginController implements IController {
    constructor(private readonly _useCase:IGoogleLogin) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
       const {email,name,password} = req.body;
      const userAndToken = await this._useCase.execute(
       { email,
        name,
        password,
        }
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
     next(err);
    }
    }
}