import { Response, Request, NextFunction } from "express";
import { IuserUseCase } from "../useCase/interface/useCsesInterface/IuserUseCase";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../framework/webServer/middlewares/tockens";
import { catchError } from "../useCase/middlewares/catchError";
import { UserCreatedPublisher } from "../framework/webServer/config/kafka/producer/user-created-publisher";
import kafkaWrapper from "../framework/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class UserController {
  private userUseCase: IuserUseCase;
  constructor(userUseCase: IuserUseCase) {
    this.userUseCase = userUseCase;
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.userUseCase.userSignUp(req.body, next);
      
       
      if (token) {
        res.cookie("verificationToken",token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "none",
          expires: new Date(Date.now() + 300 * 60 * 1000),
        });

        res.status(200).json({
          succes: true,
          message: "verification otp has been send to the Email",
          verifyToken: token,
        });
      }
    } catch (err) {
      console.log("user sign up err", err);
      catchError(err, next);
    }
  }
  async resentOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userUseCase.sentOtp(req.body.email, next);

      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      console.log("resnt otp err", err);
      catchError(err, next);
    }
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.verificationToken

      if (typeof token !== "string") {
        throw new Error("Invalid token");
      }
      const user = await this.userUseCase.insertUser(
        token as string,
        req.body.otp,
        next
      );
   
      
      if (user) {
       await new UserCreatedPublisher(kafkaWrapper.producer as Producer).produce({
         _id: user.user._id! as string,
         name: user.user.name as string,
         email: user.user.email as string,
         isInstructor: user.user.isInstructor! as boolean,
         password: user.user.password
       })
  
      res.cookie('verificationToken','',{
        httpOnly:true,
        expires:new Date(0)
       });
      res.cookie('accessToken',user.tokens.accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        expires: new Date(Date.now() + 300 * 60 * 1000),
       });
       
      res.cookie('refreashToken',user.tokens.refreashToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        expires: new Date(Date.now() + 300 * 60 * 1000),
       });
      
      res.send({ succusse: true, user: user });
      }
    } catch (err) {
      catchError(err, next);
    }
  }
  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userAndTokens = await this.userUseCase.login(
        req.body.email,
        req.body.password,
        next
      );

      
      if (userAndTokens) {
        
        req.session={accessToken:userAndTokens.token.accessToken}
        res.send(userAndTokens);

      }
    } catch (err) {
      catchError(err, next);
    }
  }
  async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userAndToken = await this.userUseCase.googleLogin(
        req.body.email,
        req.body.name,
        req.body.password,
        next
      );
      if (userAndToken) {
        res
          .cookie(
            "accessToken",
            userAndToken.token.accessToken,
            accessTokenOptions
          )
          .json({ success: true, user: userAndToken });
      }
    } catch (err) {
      catchError(err, next);
    }
  }
  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    const data = await this.userUseCase.verifyEmail(req.body.email, next);
    if (data) {
      return res.send({ sucess: true });
    }
  }
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    
    
    const data = await this.userUseCase.verifyOtp(
      req.body.email,
      req.body.otp,
      next
    );
    if (data) {
     
      return res.send({ sucess: true });
    }
  }
  async changePassword(req: Request, res: Response, next: NextFunction) {
    const data = await this.userUseCase.changePassword(
      req.body.email,
      req.body.password,
      next
    );
    if (data) {
      return res.send({ sucess: true });
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
   
    const { userId, name, email } = req.body;
    const user = await this.userUseCase.editUser(userId, name, email, next);
    if (user) {
      return res.send({ success: true, user: user });
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.session = null;
      res.send({ succuss: true, message: "logout success" });
    } catch (error: any) {
      console.log("userlogout err", error);
      catchError(error, next);
    }
  }
}
