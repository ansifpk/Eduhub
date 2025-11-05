import { IController, StatusCodes } from "@eduhublearning/common";
import { NextFunction, Request, Response } from "express";
import { GetInstructorCourses } from "../../../application/user/getInstructorCourses";

export class GetInstructorCoursesController implements IController {
  constructor(private readonly _useCase: GetInstructorCourses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId } = req.params;
      const courses = await this._useCase.execute({ instructorId, next });
      if (courses) {
        res.status(StatusCodes.OK).send({ success: true, courses: courses });
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}
