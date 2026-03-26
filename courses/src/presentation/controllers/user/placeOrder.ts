import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IPlaceOrder } from "../../../domain/interfaces/user/IPlaceOrder";

export class PlaceOrderController implements IController {
  constructor(private readonly _useCase: IPlaceOrder) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { course, userId, couponCode } = req.body;
      const sessionId = await this._useCase.execute(
        {course,
        userId,
        couponCode,
        }
      );
      if (sessionId) {
        res.status(StatusCodes.CREATED).send({ id: sessionId });
      }
    } catch (error) {
      next(error);
    }
  }
}
