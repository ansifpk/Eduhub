import { Response, Request, NextFunction } from "express";
import { IuserUseCase } from "../useCase/interface/useCsesInterface/IuserUseCase";
import kafkaWrapper from "../framework/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { ForbiddenError, NotAuthorizedError, UserCreatedPublisher } from "@eduhublearning/common";

export class UserController {
  private userUseCase: IuserUseCase;
  constructor(userUseCase: IuserUseCase) {
    this.userUseCase = userUseCase;
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.userUseCase.userSignUp(req.body, next);
      if (token) {
        res.cookie('verificationToken',token,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:'strict',
          maxAge:30 * 24 * 60 * 60 * 1000
         });
        res.status(200).json({
          succes: true,
          message: "verification otp has been send to the Email",
          verifyToken: token,
        });
      }
    } catch (err) {
      console.error(err);
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
      console.error(err);;
    }
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.cookies){
       throw new NotAuthorizedError()
      }
      if(!req.cookies.verificationToken){
        throw new NotAuthorizedError()
      }
      const token = req.cookies.verificationToken
      if (typeof token !== "string") {
        throw new NotAuthorizedError()
      }
      const user = await this.userUseCase.insertUser(
        token as string,
        req.body.otp,
        next
      );
 
      if (user) {
      //  await new UserCreatedPublisher(kafkaWrapper.producer as Producer).produce({
      //    _id: user.user._id! as string,
      //    name: user.user.name as string,
      //    email: user.user.email as string,
      //    isInstructor: user.user.isInstructor! as boolean,
      //    password: user.user.password,
      //    createdAt: user.user.createdAt!,
      //  })
  
       res.cookie('verificationToken','',{
        httpOnly:true,
        expires:new Date(0)
       });

       res.cookie('accessToken',user.tokens.accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:process.env.NODE_ENV == 'development'?'strict':"none",
        maxAge: 15 * 60 * 1000
       });

      res.cookie('refreshToken',user.tokens.refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000
     });
      
      res.send({ succusse: true, user: user });
      }
    } catch (err) {
      console.error(err);
      next(err)
    }
  }
  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const {email,password} = req.body;
      const userAndTokens = await this.userUseCase.login(
        email,
        password,
        next
      ); 
      if (userAndTokens) { 
        res.cookie('accessToken',userAndTokens.token.accessToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:process.env.NODE_ENV == "none",
          maxAge: 15 * 60 * 1000,
       });
        res.cookie('refreshToken',userAndTokens.token.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:"none",
          maxAge:30 * 24 * 60 * 60 * 1000,
       });
        console.log("success");
        
        res.send(userAndTokens);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
       const {email,name,password} = req.body;
      
       
      const userAndToken = await this.userUseCase.googleLogin(
        email,
        name,
        password,
        next
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

          res.send({ success: true, user: userAndToken });
      }
    } catch (err) {
      console.error(err);
    }
  }
  async forgetPassword(req: Request, res: Response, next: NextFunction) {
   try {
     const data = await this.userUseCase.verifyEmail(req.body.email, next);
     if (data) {
       return res.send({ sucess: true });
     }
   } catch (error) {
    console.error(error);
   }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
   try {
    const {userId} = req.params
    const {password,newPassword,conPassword} = req.body
     const data = await this.userUseCase.resetPassword(userId,password,newPassword,conPassword, next);
     if (data) {
       return res.send({ success: true });
     }
   } catch (error) {
    console.error(error);
   }
  }
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    
    try { const {email,otp} = req.body;
      const data = await this.userUseCase.verifyOtp(
      email,
       otp,
        next
      );
      if (data) {
        return res.send({ sucess: true });
      }
    } catch (error) {
      console.error(error);
    }

  }
  async changePassword(req: Request, res: Response, next: NextFunction) {

    try {
      const {email,password} = req.body;
      const data = await this.userUseCase.changePassword(
        email,
        password,
        next
      );
      if (data) {
        return res.send({ sucess: true });
      }
    } catch (error) {
      console.error(error);
    }

  }

  async editUser(req: Request, res: Response, next: NextFunction) {
   try {
    const { userId, name, email } = req.body;
    const user = await this.userUseCase.editUser(userId, name, email, next);
    if (user) {
      return res.send({ success: true, user: user });
    }
   } catch (error) {
    console.error(error);
   }

  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {      
      res.cookie('accessToken','',{
        httpOnly:true,
        expires:new Date(0)
       });
      res.cookie('refreshToken','',{
        httpOnly:true,
        expires:new Date(0)
       });
      res.send({ succuss: true, message: "logout success" });
    } catch (error) {
      console.error(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {      
      const   {userId}= req.params
      const   {email}= req.body
      const otp  = await this.userUseCase.verifyNewEmail(userId,email,next)
      if(otp){
        return res.send({success:true,otp:otp});
      }
    } catch (error) {
      console.error(error);
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {      
      const   {userId}= req.params
      const   {email,otp}= req.body
      const user  = await this.userUseCase.changeEmail(userId,email,otp,next)
      if(user){
        return res.send({success:true,user:user});
      }
    } catch (error) {
      console.error(error);
    }
  }


  async checkTockens(req: Request, res: Response, next: NextFunction) {
    try {    
       console.log("hi",req.cookies.refreshToken)
      if(!req.cookies.refreshToken){
        throw new ForbiddenError()
      }
      const tocken = req.cookies.refreshToken;

      const tockens  = await this.userUseCase.checkTockens(tocken,next)
      if(tockens){
       
        res.cookie('accessToken',tockens.accessToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:'strict',
          maxAge: 15 * 60 * 1000
       });
        res.cookie('refreshToken',tockens.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:'strict',
          maxAge:30 * 24 * 60 * 60 * 1000
       });
        return res.send({success:true,tockens});
      }
    } catch (error) {
      console.error(error);
      next(error)
    }
  }

}
