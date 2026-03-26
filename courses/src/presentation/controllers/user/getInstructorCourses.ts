import { IController, StatusCodes } from "@eduhublearning/common";
import { NextFunction, Request, Response } from "express";
import { IGetInstructorCourses } from "../../../domain/interfaces/user/IGetInstructorCourses";

export class GetInstructorCoursesController implements IController {
  constructor(private readonly _useCase: IGetInstructorCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const courses = await this._useCase.execute({ instructorId });
      if (courses) {
        res.status(StatusCodes.OK).send({ success: true, courses: courses });
      }
    } catch (error) {
      next(error);
    }
  }
}
