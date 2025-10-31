import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { CouponDetailes } from "../../../application/admin/couponDetailes";

export class CouponDetailesController implements IController {
  constructor(private readonly _usecase: CouponDetailes) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { couponId } = req.params;
      const coupon = await this._usecase.execute({ _id: couponId, next });
      if (coupon) {
        res.send({ success: true, coupon: coupon });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
