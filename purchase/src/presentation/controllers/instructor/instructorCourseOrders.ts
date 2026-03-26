import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IInstructorCourseOrders } from "../../../domain/interfaces/useCases/instructor/IInstructorCourseOrders";

export class InstructorsCourseOrdersController implements IController {
  constructor(private readonly _useCase: IInstructorCourseOrders) {}
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
      });
      if (orders) {
        res.status(StatusCodes.OK).send({ success: true, orders: orders });
      }
    } catch (error) {
      next(error);
    }
  }
}
