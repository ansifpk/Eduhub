import { IController, IUseCase, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ICouponDetailes } from "../../../domain/interfaces/user/ICouponDetailes";

export class UserCouponDetailesController implements IController {
  constructor(private readonly _useCase: ICouponDetailes ) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { couponCode, userId } = req.params;
      const coupons = await this._useCase.execute({ couponCode, userId });
      if (coupons) {
        res.status(StatusCodes.OK).send({ success: true, coupons: coupons });
      }
    } catch (error) {
      next(error);
    }
  }
}
