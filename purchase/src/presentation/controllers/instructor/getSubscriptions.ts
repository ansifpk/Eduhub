import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstrutcorGetSubscriptions } from "../../../domain/interfaces/useCases/instructor/IInstrutcorGetSubscriptions";

export class InstructorGetSubscriptionsController implements IController {
  constructor(private readonly _useCase: IInstrutcorGetSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const subscriptions = await this._useCase.execute();
      if (subscriptions) {
        res.status(StatusCodes.OK).send({ success: true, subscriptions: subscriptions });
      }
    } catch (error) {
      next(error);
    }
  }
}
