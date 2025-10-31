import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorGetCourses } from "../../../application/instructor/getCourses";

export class InstructorGetCoursesController implements IController {
  constructor(private readonly _useCase: InstructorGetCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId, search, sort } = req.query;
      let page = Number(req.query.page);

      const courses = await this._useCase.execute({
        instructorId: instructorId as string,
        search: search as string,
        sort: sort as string,
        page,
        next,
      });
      if (courses) {
        res.send({ success: true, courses: courses });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
