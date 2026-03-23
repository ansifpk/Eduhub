import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ISubscriptionPurchase } from "../../../domain/interfaces/useCases/instructor/ISubscriptionPurchase";

export class SubscriptionPurchaseController implements IController {
  constructor(private readonly _useCase:ISubscriptionPurchase) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { method, userId } = req.params;
      const sessionId = await this._useCase.execute({ userId, method });
      if (sessionId) {
        res.status(StatusCodes.OK).send({ success: true, sessionId });
      }
    } catch (error) {
      next(error);
    }
  }
}
