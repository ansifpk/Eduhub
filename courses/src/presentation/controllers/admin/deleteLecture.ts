import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IDeleteLecture } from "../../../domain/interfaces/admin/IDeleteLecture";

export class DeleteLectureController implements IController {
  constructor(private readonly _useCase: IDeleteLecture) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { lectureUrl } = req.body;
      const courses = await this._useCase.execute({ lectureUrl });
      if (courses) {
        res.status(StatusCodes.NO_CONTENT).send({ success: true });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
