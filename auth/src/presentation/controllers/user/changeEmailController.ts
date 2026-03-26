import { Request, Response, NextFunction } from "express";
import { EmailChangedPublisher, StatusCodes } from "@eduhublearning/common";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { IController } from "../../../shared/IController";
import { IChangeEmail } from "../../../domain/interfaces/user/useCases/IChangeEmail";

export class ChangeEmailController implements IController {
  constructor(private readonly _useCase: IChangeEmail) {

  }
  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params
      const { email, otp } = req.body
      const user = await this._useCase.execute({ userId, email, otp })
      if (user) {
        await new EmailChangedPublisher(kafkaWrapper.producer as Producer).produce({
          _id: user._id!,
          email: user.email
        })
        res.status(StatusCodes.OK).send({ success: true, user: user });
      }
    } catch (error) {
      next(error)
    }
  }
}