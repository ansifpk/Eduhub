import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorCourseOrders } from "../../../application/instructor/instructorCourseOrders";

export class InstructorsCourseOrdersController implements IController {
  constructor(private readonly _useCase: InstructorCourseOrders) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { instructorId, start, end } = req.params;
      const orders = await this._useCase.execute({
        instructorId,
        start: new Date(start),
        end: new Date(end),
        next,
      });
      if (orders) {
        res.send({ success: true, orders: orders });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
