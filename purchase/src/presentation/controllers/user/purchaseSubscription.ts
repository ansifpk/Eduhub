import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IPurchaseSubscription } from "../../../domain/interfaces/useCases/user/IPurchaseSubscription";

export class PurchaseSubscriptionController implements IController {
  constructor(private readonly _useCase: IPurchaseSubscription) {}
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
      });
      if (sessionId) {
        res.status(StatusCodes.CREATED).send({ success: true, sessionId });
      }
    } catch (error) {
      next(error);
    }
  }
}
