import {
  IController,
  StatusCodes,
  UserProfileUpdatedPublisher,
} from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { IEditProfile } from "../../../domain/interfaces/useCases/user/IEditProfile";

export class EditProfileController implements IController {
  constructor(private readonly _useCase: IEditProfile) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { name, thumbnail, aboutMe } = req.body;
      const userProfile = await this._useCase.execute({
        userId,
        name,
        thumbnail,
        aboutMe,
      });
      if (userProfile) {
        await new UserProfileUpdatedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: userProfile._id,
          name: userProfile.name,
        });
        res.status(StatusCodes.OK).send({ success: true, user: userProfile });
      }
    } catch (error) {
      next(error);
    }
  }
}
