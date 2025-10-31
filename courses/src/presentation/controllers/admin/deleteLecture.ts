import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { DeleteLecture } from "../../../application/admin/deleteLecture";

export class DeleteLectureController implements IController {
  constructor(private readonly _useCase: DeleteLecture) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { lectureUrl } = req.body;
      const courses = await this._useCase.execute({ lectureUrl, next });
      if (courses) {
        res.send({ success: true });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
