import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminCreateSubscription } from "../../../application/admin/createSubscription";

export class AdminCreateSubscriptionController implements IController {
  constructor(private readonly _useCase: AdminCreateSubscription) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { price, description, plan } = req.body;
      const subscription = await this._useCase.execute({
        price,
        plan,
        description,
        next,
      });
      if (subscription) {
        res.send({ success: true, subscription: subscription });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
