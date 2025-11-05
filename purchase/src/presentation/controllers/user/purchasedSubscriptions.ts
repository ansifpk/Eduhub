import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { PurchasedSubscriptions } from "../../../application/user/purchasedSubscriptions";

export class PurchasedSubscriptionsController implements IController {
  constructor(private readonly _useCase: PurchasedSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const plans = await this._useCase.execute({ userId, next });

      if (plans) {
        res.status(StatusCodes.OK).send({ success: true, plans });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
