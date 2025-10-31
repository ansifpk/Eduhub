import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ICoupon } from "../../domain/entities/coupon";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";

export class UserGetCoupons
  implements IUseCase<{ next: NextFunction }, ICoupon[] | void>
{
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(input: {
    next: NextFunction;
  }): Promise<void | ICoupon[]> {
    try {
      const coupons = await this.userRepository.Coupons();
      if (coupons) {
        return coupons;
      }
    } catch (error) {
      input.next(error);
      console.error(error);
    }
  }
}
