import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAdminEditSubscriptions } from "../../../domain/interfaces/useCases/admin/IAdminEditSubscription";

export class AdminEditSubscriptionController implements IController {
  constructor(private readonly _useCase: IAdminEditSubscriptions) {}

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
      });
      if (subscription) {
        res.status(StatusCodes.NO_CONTENT).send({ success: true });
      }
    } catch (error) {
      next(error);
    }
  }
}
