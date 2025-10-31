import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { CreateReport } from "../../../application/admin/createReport";

export class ReportController implements IController {
  constructor(private readonly _useCase: CreateReport) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reports = await this._useCase.execute({ next });
      if (reports) {
        res.send(reports);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
