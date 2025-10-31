import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICoupon } from "../../domain/entities/coupon";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";

export class GetCoupons
  implements
    IUseCase<
      { search: string; sort: string; page: string; next: NextFunction },
      ICoupon[] | void
    >
{
  constructor(private readonly couponRepository: AdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: string;
    next: NextFunction;
  }): Promise<void | ICoupon[]> {
    try {
      const coupon = await this.couponRepository.coupons(
        input.search,
        input.sort,
        input.page
      );
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
