import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { BlockUser } from "../../../application/admin/blockUser";
import { StatusCodes, UserBlcokedPublisher } from "@eduhublearning/common";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class BlockUserController implements IController {
  constructor(private readonly _useCase: BlockUser) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this._useCase.execute({ userId, next });

      if (user) {
        await new UserBlcokedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: user._id!,
          isBlock: user.isBlock!,
        });
        res.status(StatusCodes.OK).send({ success: true, data: user });
      }
    } catch (error) {
      next(error);
    }
  }
}
