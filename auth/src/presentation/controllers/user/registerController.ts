import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IUserSignUp } from "../../../domain/interfaces/user/useCases/IUserSignUp";

export class RegisterController implements IController {
    constructor(private readonly _useCase:IUserSignUp) {
        
    }
    public async  handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
      const token = await this._useCase.execute({user:req.body});
      if (token) {
        res.cookie('verificationToken',token,{
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
          path:"/",
          maxAge:30 * 24 * 60 * 60 * 1000,
         });
        res.status(200).json({
          succes: true,
          message: "verification otp has been send to the Email",
        });
      }
    } catch (err) {
      next(err);
    }
    }
}