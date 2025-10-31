import { IController } from "@eduhublearning/common";
import { UserCourseDatailes } from "../../../application/user/courseDetailes";
import { Request, Response, NextFunction } from "express";

export class UserCourseDatailesController implements IController {
  constructor(private readonly _useCase: UserCourseDatailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const course = await this._useCase.execute({ courseId, next });
      if (course) {
        res.send({ success: true, course: course });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
