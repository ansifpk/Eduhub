import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IAdminGetOrders } from "../../../domain/interfaces/useCases/admin/IAdminGetOrders";

export class AdminGetOrdersController implements IController {
  constructor(private readonly _useCase: IAdminGetOrders) {}
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
      });
      if (orders) {
        res.status(StatusCodes.OK).send({ success: true, orders });
      }
    } catch (error) {
      next(error);
    }
  }
}
