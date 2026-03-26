import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAdminCreateSubscriptions } from "../../../domain/interfaces/useCases/admin/IAdminCreateSubscription";

export class AdminCreateSubscriptionController implements IController {
  constructor(private readonly _useCase: IAdminCreateSubscriptions) {}
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
      });
      if (subscription) {
        res.status(StatusCodes.CREATED).send({ success: true, subscription: subscription });
      }
    } catch (error) {
      next(error);
    }
  }
}
