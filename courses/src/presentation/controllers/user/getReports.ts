import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetReports } from "../../../application/user/getReports";

export class GetReportsController implements IController {
  constructor(private readonly _useCase: GetReports) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, courseId } = req.params;
      const reports = await this._useCase.execute({ userId, courseId, next });
      if (reports) {
        res.status(StatusCodes.OK).send({ success: true, reports: reports });
      }
    } catch (error) {
      next(error);
      console.error(error);
    }
  }
}
