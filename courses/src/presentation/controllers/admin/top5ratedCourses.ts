import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Top5RatedCourses } from "../../../application/admin/top5ratedCourses";

export class Top5RatedCoursesController implements IController {
  constructor(private readonly _useCase: Top5RatedCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const courses = await this._useCase.execute({ next });
      if (courses) {
        res.send(courses);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
