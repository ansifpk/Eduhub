import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ICreateReport } from "../../../domain/interfaces/admin/ICreateReport";

export class ReportController implements IController {
  constructor(private readonly _useCase: ICreateReport) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reports = await this._useCase.execute();
      if (reports) {
        res.status(StatusCodes.OK).send(reports);
      }
    } catch (error) {
      next(error);
    }
  }
}
