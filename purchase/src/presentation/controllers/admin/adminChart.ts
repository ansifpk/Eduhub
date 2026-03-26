import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAdminChart } from "../../../domain/interfaces/useCases/admin/IAdminChart";

export class AdminChartController implements IController {
  constructor(private readonly _useCase: IAdminChart) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end } = req.params;
      const orders = await this._useCase.execute({ start, end });
      if (orders) {
        res.status(StatusCodes.OK).send({ success: true, orders });
      }
    } catch (error) {
      next(error);
    }
  }
}
