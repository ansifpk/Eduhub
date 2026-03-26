import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetOrders } from "../../../domain/interfaces/useCases/instructor/IGetOrders";

export class GetOrdersController implements IController {
  constructor(private readonly _useCase: IGetOrders) {}
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
        res.status(StatusCodes.OK).send({ success: true, orders });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
