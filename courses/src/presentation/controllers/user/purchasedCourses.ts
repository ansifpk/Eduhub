import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IPurchasedCourses } from "../../../domain/interfaces/user/IPurchasedCourses";

export class PurchasedCoursesController implements IController {
  constructor(private readonly _useCase: IPurchasedCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const course = await this._useCase.execute({ userId });
      if (course) {
        res.status(StatusCodes.OK).send({ success: true, course: course });
      }
    } catch (error) {
      next(error);
    }
  }
}
