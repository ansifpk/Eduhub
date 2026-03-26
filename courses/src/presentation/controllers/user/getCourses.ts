import { IController, StatusCodes } from "@eduhublearning/common";
import { NextFunction, Request, Response } from "express";
import { IUserGetCourses } from "../../../domain/interfaces/user/IUserGetCourses";

export class UserGetCoursesController implements IController {
  constructor(private readonly _useCases: IUserGetCourses) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category, level, topic, search, sort, page } = req.query;

      const courses = await this._useCases.execute({
        category: category as string,
        topic: topic as string,
        level: level as string,
        search: search as string,
        sort: sort as string,
        page: parseInt(page as string),
      });
      if (courses) {
        res.status(StatusCodes.OK).send({
          success: true,
          courses: courses.courses,
          pages: courses.pages,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
