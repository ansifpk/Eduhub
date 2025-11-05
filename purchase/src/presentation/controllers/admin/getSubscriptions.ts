import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetAdminSubscriptions } from "../../../application/admin/getSubscriptions";

export class GetAdminSubscriptionsController implements IController {
  constructor(private readonly _useCase: GetAdminSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subscriptions = await this._useCase.execute({ next });
      if (subscriptions) {
        res.status(StatusCodes.OK).send({ success: true, subscriptions: subscriptions });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
