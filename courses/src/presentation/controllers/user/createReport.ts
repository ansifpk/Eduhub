import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { UserCreateReport } from "../../../application/user/createReport";

export class UserCreateReportController implements IController {
  constructor(private readonly _useCase: UserCreateReport) {}
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
        next,
      });
      if (createReport) {
        res.send({ success: true, report: createReport });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
