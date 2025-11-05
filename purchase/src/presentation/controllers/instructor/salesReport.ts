import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { SalesReport } from "../../../application/instructor/salesReport";

export class SalesReportController implements IController {
  constructor(private readonly _useCase: SalesReport) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId, start, end } = req.query;
      const orders = await this._useCase.execute({
        instructorId: instructorId as string,
        start: start as string,
        end: end as string,
        next,
      });
      if (orders) {
        orders.xlsx.writeBuffer().then((data) => {
          res.status(StatusCodes.OK).send(data);
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
