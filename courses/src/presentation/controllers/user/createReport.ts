import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IUserCreateReport } from "../../../domain/interfaces/user/IUserCreateReport";

export class UserCreateReportController implements IController {
  constructor(private readonly _useCase: IUserCreateReport) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const { report, content, courseId } = req.body;
      const createReport = await this._useCase.execute({
        userId,
        report,
        content,
        courseId,
      });
      if (createReport) {
        res.status(StatusCodes.CREATED).send({ success: true, report: createReport });
      }
    } catch (error) {
      next(error);
    }
  }
}
