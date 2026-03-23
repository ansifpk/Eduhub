import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorSubscriptions } from "../../../domain/interfaces/useCases/instructor/IInstructorSubscriptions";

export class InstructorsSubscriptionController implements IController {
  constructor(private readonly _useCase: IInstructorSubscriptions) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const subscriptions = await this._useCase.execute({
        instructorId: userId,
      });
      if (subscriptions) {
        res.status(StatusCodes.OK).send({ success: true, subscriptions });
      }
    } catch (error) {
      next(error);
    }
  }
}
