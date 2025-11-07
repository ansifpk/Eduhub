import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { UserSignUp } from "../../../application/user/userSignUp";

export class RegisterController implements IController {
    constructor(private readonly _useCase:UserSignUp) {
        
    }
    public async  handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
      const token = await this._useCase.execute({user:req.body, next});
      if (token) {
        
        res.cookie('verificationToken',token,{
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge:30 * 24 * 60 * 60 * 1000,
         });
        res.status(200).json({
          succes: true,
          message: "verification otp has been send to the Email",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
    }
}