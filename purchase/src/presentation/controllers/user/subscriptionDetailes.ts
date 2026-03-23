import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ISubscriptionDetailes } from "../../../domain/interfaces/useCases/user/ISubscriptionDetailes";

export class SubscriptionDetailesController implements IController {
  constructor(private readonly _useCase: ISubscriptionDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { customerId } = req.params;
      const sessionId = await this._useCase.execute({ customerId });
      if (sessionId) {
        res.status(StatusCodes.OK).send({ success: true, url: sessionId });
      }
    } catch (error) {
      next(error);
    }
  }
}
