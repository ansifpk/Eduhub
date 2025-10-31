import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminEditSubscription } from "../../../application/admin/editSubscription";

export class AdminEditSubscriptionController implements IController {
  constructor(private readonly _useCase: AdminEditSubscription) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { subscriptionId } = req.params;
      const { price } = req.body;
      const subscription = await this._useCase.execute({
        subscriptionId,
        price: parseInt(price),
        next,
      });
      if (subscription) {
        res.send({ success: true });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
