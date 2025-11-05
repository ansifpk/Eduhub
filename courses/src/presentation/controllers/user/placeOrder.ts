import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { PlaceOrder } from "../../../application/user/placeOrder";

export class PlaceOrderController implements IController {
  constructor(private readonly _useCase: PlaceOrder) {}
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
        next}
      );
      if (sessionId) {
        res.status(StatusCodes.CREATED).send({ id: sessionId });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
