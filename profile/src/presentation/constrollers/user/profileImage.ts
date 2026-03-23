import {
  IController,
  ProfilePictureUpdatedPublisher,
  StatusCodes,
} from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { IProfileImage } from "../../../domain/interfaces/useCases/user/IProfileImage";

export class ProfileImageController implements IController {
  constructor(private readonly _useCase: IProfileImage) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      let files = req.files as {
        profileImage: Express.Multer.File[];
      };

      const user = await this._useCase.execute({ userId, image: files });
      if (user) {
        await new ProfilePictureUpdatedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: user._id,
          avatar: user.avatar,
        });
        res.status(StatusCodes.OK).send({ success: true, image: user.avatar.avatar_url });
      }
    } catch (error) {
      next(error);
    }
  }
}
