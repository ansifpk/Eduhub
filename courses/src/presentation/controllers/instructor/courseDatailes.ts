import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorCourseDetailes } from "../../../application/instructor/courseDetailes";

export class InstructorCourseDetailesController implements IController {
  constructor(private readonly _useCase: InstructorCourseDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const course = await this._useCase.execute({ courseId, next });
      if (course) {
        res.status(StatusCodes.OK).send({ success: true, course });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
