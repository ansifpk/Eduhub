import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";
import { ICoupon } from "../../domain/entities/coupon";

export class DeleteCoupon
  implements IUseCase<{ _id: string; next: NextFunction }, ICoupon | void>
{
  constructor(private readonly couponRepository: AdminRepository) {}
  public async execute(input: {
    _id: string;
    next: NextFunction;
  }): Promise<ICoupon | void> {
    try {
      const { _id } = input;
      const couponCheck = await this.couponRepository.findCouponById(_id);

      if (!couponCheck) {
        throw new BadRequestError(ErrorMessages.COUPON_NOT_FOUND);
      }

      const coupon = await this.couponRepository.deleteCoupon(_id);
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
