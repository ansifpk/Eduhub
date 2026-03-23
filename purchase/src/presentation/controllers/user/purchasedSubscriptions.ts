import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IPurchasedSubscriptions } from "../../../domain/interfaces/useCases/user/IPurchasedSubscriptions";

export class PurchasedSubscriptionsController implements IController {
  constructor(private readonly _useCase: IPurchasedSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const plans = await this._useCase.execute({ userId });

      if (plans) {
        res.status(StatusCodes.OK).send({ success: true, plans });
      }
    } catch (error) {
      next(error);
    }
  }
}
