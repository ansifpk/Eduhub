import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminChart } from "../../../application/admin/adminChart";

export class AdminChartController implements IController {
  constructor(private readonly _useCase: AdminChart) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end } = req.params;
      const orders = await this._useCase.execute({ start, end, next });
      if (orders) {
        res.send({ success: true, orders });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
