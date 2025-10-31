import { IController } from "@eduhublearning/common";
import { EditCoupon } from "../../../application/admin/editCoupon";
import { Request, Response, NextFunction } from "express";

export class EditCouponController implements IController {
  constructor(private readonly _useCase: EditCoupon) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { couponId } = req.params;

      const {
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
      } = req.body;

      const coupon = await this._useCase.execute({
        couponId,
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
        next,
      });
      if (coupon) {
        res.send({ success: true, coupon: coupon });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
