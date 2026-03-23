import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ICouponDetailes } from "../../../domain/interfaces/admin/ICouponDetailes";

export class CouponDetailesController implements IController {
  constructor(private readonly _usecase: ICouponDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { couponId } = req.params;
      const coupon = await this._usecase.execute({ _id: couponId });
      if (coupon) {
        res.status(StatusCodes.OK).send({ success: true, coupon: coupon });
      }
    } catch (error) {
      next(error);
    }
  }
}
