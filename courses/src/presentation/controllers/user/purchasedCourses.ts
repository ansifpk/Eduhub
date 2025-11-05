import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { PurchasedCourses } from "../../../application/user/purchasedCourses";

export class PurchasedCoursesController implements IController {
  constructor(private readonly _useCase: PurchasedCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const course = await this._useCase.execute({ userId, next });
      if (course) {
        res.status(StatusCodes.OK).send({ success: true, course: course });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
