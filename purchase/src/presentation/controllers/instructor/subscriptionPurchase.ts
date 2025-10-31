import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { SubscriptionPurchase } from "../../../application/instructor/subscriptionPurchase";

export class SubscriptionPurchaseController implements IController {
  constructor(private readonly _useCase:SubscriptionPurchase) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { method, userId } = req.params;
      const sessionId = await this._useCase.execute({ userId, method, next });
      if (sessionId) {
        res.send({ success: true, sessionId });
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}
