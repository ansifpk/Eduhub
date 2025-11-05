import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError, StatusCodes, UserCreatedPublisher } from "@eduhublearning/common";
import { Producer } from "kafkajs";
import { CreateUser } from "../../../application/user/createUser";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { IController } from "../../../shared/IController";



export class CreatUserController implements IController {
    constructor(private readonly _useCase:CreateUser) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      const user = await this._useCase.execute({
        token:token as string,
        otp:req.body.otp,
        next
        });
 
      if (user) {
       await new UserCreatedPublisher(kafkaWrapper.producer as Producer).produce({
         _id: user.user._id! as string,
         name: user.user.name as string,
         email: user.user.email as string,
         isInstructor: user.user.isInstructor! as boolean,
         password: user.user.password,
         createdAt: user.user.createdAt!,
       })
  
       res.cookie('verificationToken','',{
        httpOnly:true,
        path:"/",
        expires:new Date(0)
       });

       res.cookie('accessToken',user.tokens.accessToken,{
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
          path:"/",
          maxAge:15 * 60 * 1000,
       });
        res.cookie('refreshToken',user.tokens.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV !== 'development',
          sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
          path:"/",
          maxAge:30 * 24 * 60 * 60 * 1000,
       });
      
      res.status(StatusCodes.CREATED).send({ succusse: true, user: user });
      }
        } catch (error) {
            console.error(error);
        }
    }
}