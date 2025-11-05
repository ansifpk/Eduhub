import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { SubscriptionDetailes } from "../../../application/user/subscriptionDetailes";

export class SubscriptionDetailesController implements IController {
  constructor(private readonly _useCase: SubscriptionDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { customerId } = req.params;
      const sessionId = await this._useCase.execute({ customerId, next });
      if (sessionId) {
        res.status(StatusCodes.OK).send({ success: true, url: sessionId });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
