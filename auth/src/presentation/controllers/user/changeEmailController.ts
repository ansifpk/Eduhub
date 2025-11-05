import { Request, Response, NextFunction } from "express";
import { EmailChangedPublisher, StatusCodes } from "@eduhublearning/common";
import { Producer } from "kafkajs";
import { ChangeEmail } from "../../../application/user/changeEmail";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { IController } from "../../../shared/IController";

export class ChangeEmailController implements IController {
    constructor(private readonly _useCase:ChangeEmail) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {      
      const   {userId}= req.params
      const   {email,otp}= req.body
      const user  = await this._useCase.execute({userId,email,otp,next})
      if(user){
        await new EmailChangedPublisher(kafkaWrapper.producer as Producer).produce({
          _id: user._id!,
          email: user.email
        })
        res.status(StatusCodes.OK).send({success:true,user:user});
      }
    } catch (error) {
      console.error(error);
    }
    }
}