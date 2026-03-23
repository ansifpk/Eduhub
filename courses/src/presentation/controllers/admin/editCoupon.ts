import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IEditCoupon } from "../../../domain/interfaces/admin/IEditCoupon";

export class EditCouponController implements IController {
  constructor(private readonly _useCase: IEditCoupon) {}
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
      });
      if (coupon) {
        res.status(StatusCodes.OK).send({ success: true, coupon: coupon });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
