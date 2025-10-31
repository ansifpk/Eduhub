import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminSalesRepost } from "../../../application/admin/salesReports";

export class AdminSalesRepostController implements IController {
  constructor(private readonly _useCase: AdminSalesRepost) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end } = req.query;
      const workbook = await this._useCase.execute({
        start: start as string,
        end: end as string,
        next,
      });
      if (workbook) {
        workbook.xlsx.writeBuffer().then((data) => {
          res.status(200).send(data);
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
