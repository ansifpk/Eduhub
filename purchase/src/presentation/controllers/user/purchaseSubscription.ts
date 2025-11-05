import { IController, StatusCodes } from "@eduhublearning/common";
import { PurchaseSubscription } from "../../../application/user/purchaseSubscription";
import { Request, Response, NextFunction } from "express";

export class PurchaseSubscriptionController implements IController {
  constructor(private readonly _useCase: PurchaseSubscription) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { subscriptionId } = req.params;
      const { userId } = req.body;
      const sessionId = await this._useCase.execute({
        userId,
        subscriptionId,
        next,
      });
      if (sessionId) {
        res.status(StatusCodes.CREATED).send({ success: true, sessionId });
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}
