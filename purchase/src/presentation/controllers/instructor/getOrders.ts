import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetOrders } from "../../../application/instructor/getOrders";

export class GetOrdersController implements IController {
  constructor(private readonly _useCase: GetOrders) {}
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
        res.send({ success: true, orders });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
