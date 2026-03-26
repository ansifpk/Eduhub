import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetSubscriptions } from "../../../domain/interfaces/useCases/user/IGetSubscriptions";

export class GetSubscriptionsController implements IController {
  constructor(private readonly _useCase: IGetSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const subscriptions = await this._useCase.execute({ instructorId });
      if (subscriptions) {
        res.status(StatusCodes.OK).send({ success: true, subscriptions });
      }
    } catch (error) {
      next(error);
    }
  }
}
