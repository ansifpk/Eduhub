import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ITop5RatedCourses } from "../../../domain/interfaces/admin/ITop5ratedCourses";

export class Top5RatedCoursesController implements IController {
  constructor(private readonly _useCase: ITop5RatedCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const courses = await this._useCase.execute();
      if (courses) {
        res.status(StatusCodes.OK).send(courses);
      }
    } catch (error) {
      next(error);
    }
  }
}
