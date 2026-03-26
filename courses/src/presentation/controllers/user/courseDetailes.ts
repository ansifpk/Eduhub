import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IUserCourseDatailes } from "../../../domain/interfaces/user/IUserCourseDatailes";

export class UserCourseDatailesController implements IController {
  constructor(private readonly _useCase: IUserCourseDatailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const course = await this._useCase.execute({ courseId });
      if (course) {
        res.status(StatusCodes.OK).send({ success: true, course: course });
      }
    } catch (error) {
      next(error);
    }
  }
}
