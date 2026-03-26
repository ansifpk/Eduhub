import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ITop5Courses } from "../../../domain/interfaces/instructor/ITop5Courses";

export class Top5InstructorCoursesController implements IController {
  constructor(private readonly _useCase: ITop5Courses) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const courses = await this._useCase.execute({ userId });
      if (courses) {
        res.status(StatusCodes.OK).send({ success: true, courses });
      }
    } catch (error) {
      next(error);
    }
  }
}
