import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { AdminGetOrders } from "../../../application/admin/getOrders";

export class AdminGetOrdersController implements IController {
  constructor(private readonly _useCase: AdminGetOrders) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { end, start } = req.query;

      const orders = await this._useCase.execute({
        start: start as string,
        end: end as string,
        next,
      });
      if (orders) {
        res.status(StatusCodes.OK).send({ success: true, orders });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
