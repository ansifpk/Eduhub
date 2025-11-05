import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorCreateSubscription } from "../../../application/instructor/createSubscription";

export class CreateSubscriptionController implements IController {
  constructor(public readonly _useCase: InstructorCreateSubscription) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { plan, price, description } = req.body;

      const subscription = await this._useCase.execute({
        userId,
        plan,
        price,
        description,
        next,
      });
      if (subscription) {
        res.status(StatusCodes.CREATED).send({ success: true });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
