import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { GetCoupons } from "../../../application/admin/getCoupon";

export class GetCouponsController implements IController {
  constructor(private readonly _useCase: GetCoupons) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search, sort, page } = req.query;

      const coupon = await this._useCase.execute({
        search: search as string,
        sort: sort as string,
        page: page as string,
        next,
      });
      if (coupon) {
        res.status(StatusCodes.OK).send({ success: true, coupon: coupon });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
