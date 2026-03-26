import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IGetCoupon } from "../../../domain/interfaces/admin/IGetCoupon";

export class GetCouponsController implements IController {
  constructor(private readonly _useCase: IGetCoupon) {}
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
      });
      if (coupon) {
        res.status(StatusCodes.OK).send({ success: true, coupon: coupon });
      }
    } catch (error) {
      next(error);
    }
  }
}
