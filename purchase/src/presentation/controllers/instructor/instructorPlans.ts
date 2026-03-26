import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorPlans } from "../../../domain/interfaces/useCases/instructor/IInstructorPlans";

export class InstructorPlansController implements IController {
  constructor(private readonly _useCase: IInstructorPlans) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const plans = await this._useCase.execute({ userId });
      if (plans) {
        res.status(StatusCodes.OK).send({ success: true, plans });
      }
    } catch (error) {
      next(error);
    }
  }
}
