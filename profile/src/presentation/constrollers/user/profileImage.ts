import {
  IController,
  ProfilePictureUpdatedPublisher,
} from "@eduhublearning/common";
import { ProfileImage } from "../../../application/user/profileImage";
import { Request, Response, NextFunction } from "express";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class ProfileImageController implements IController {
  constructor(private readonly _useCase: ProfileImage) {}
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

      const user = await this._useCase.execute({ userId, image: files, next });
      if (user) {
        await new ProfilePictureUpdatedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: user._id,
          avatar: user.avatar,
        });
        res.send({ success: true, image: user.avatar.avatar_url });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
