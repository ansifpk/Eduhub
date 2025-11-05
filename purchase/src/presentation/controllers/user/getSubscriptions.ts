import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetSubscriptions } from "../../../application/user/getSubscriptions";

export class GetSubscriptionsController implements IController {
  constructor(private readonly _useCase: GetSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const subscriptions = await this._useCase.execute({ instructorId, next });
      if (subscriptions) {
        res.status(StatusCodes.OK).send({ success: true, subscriptions });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
