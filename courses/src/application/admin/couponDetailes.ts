import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";

export class CouponDetailes
  implements IUseCase<{ _id: string; next: NextFunction }, ICoupon | void>
{
  constructor(private readonly couponRepository: AdminRepository) {}
  public async execute(input: {
    _id: string;
    next: NextFunction;
  }): Promise<void | ICoupon> {
    try {
      const coupon = await this.couponRepository.findCouponById(input._id);

      if (coupon) {
        return coupon;
      } else {
        throw new BadRequestError("Coupon Not found");
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
