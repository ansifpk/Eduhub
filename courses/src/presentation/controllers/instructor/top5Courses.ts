import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Top5instructorCourses } from "../../../application/instructor/top5Courses";

export class Top5InstructorCoursesController implements IController {
  constructor(private readonly _useCase: Top5instructorCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const courses = await this._useCase.execute({ userId, next });
      if (courses) {
        res.status(StatusCodes.OK).send({ success: true, courses });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
