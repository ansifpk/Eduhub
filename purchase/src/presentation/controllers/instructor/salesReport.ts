import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ISalesReport } from "../../../domain/interfaces/useCases/instructor/ISalesReport";

export class SalesReportController implements IController {
  constructor(private readonly _useCase: ISalesReport) {}
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
      });
      if (orders) {
        orders.xlsx.writeBuffer().then((data) => {
          res.status(StatusCodes.OK).send(data);
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
