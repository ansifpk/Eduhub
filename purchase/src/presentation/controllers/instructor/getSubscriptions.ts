import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstrutcorGetSubscriptions } from "../../../application/instructor/getSubscriptions";

export class InstructorGetSubscriptionsController implements IController {
  constructor(private readonly _useCase: InstrutcorGetSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subscriptions = await this._useCase.execute({ next });
      if (subscriptions) {
        res.send({ success: true, subscriptions: subscriptions });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
