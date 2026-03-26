import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetCourse } from "../../../domain/interfaces/instructor/IGetCourses";

export class InstructorGetCoursesController implements IController {
  constructor(private readonly _useCase: IGetCourse) {}
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
      });
      if (courses) {
        res.status(StatusCodes.OK).send({ success: true, courses: courses });
      }
    } catch (error) {
      next(error);
    }
  }
}
