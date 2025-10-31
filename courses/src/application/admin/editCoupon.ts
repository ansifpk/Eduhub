import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";
import { NextFunction } from "express";

export class EditCoupon
  implements
    IUseCase<
      {
        couponId: string;
        title: string;
        description: string;
        offer: number;
        startingDate: string;
        expiryDate: string;
        couponCode: string;
        next: NextFunction;
      },
      ICoupon | void
    >
{
  constructor(private readonly couponRepository: AdminRepository) {}
  public async execute(input: {
    couponId: string;
    title: string;
    description: string;
    offer: number;
    startingDate: string;
    expiryDate: string;
    couponCode: string;
    next: NextFunction;
  }): Promise<void | ICoupon> {
    try {
      const {
        couponId,
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
      } = input;
      const couponCheck = await this.couponRepository.findCouponById(couponId);
      if (title.length < 1) {
        throw new BadRequestError("Pleaseprovide a valid title");
      }
      if (description.length < 1) {
        throw new BadRequestError("Pleaseprovide a valid description");
      }
      if (!couponCheck) {
        throw new BadRequestError("Coupon Not found");
      }
      if (expiryDate < startingDate) {
        throw new BadRequestError(
          "expiry Date date must be greaterthan Starting Date"
        );
      }
      const today = new Date().toISOString().slice(0, 16);
      if (today > startingDate) {
        throw new BadRequestError(
          "Please set the starting date as today or day that is grater than today"
        );
      }

      if (offer < 5 || offer > 15) {
        throw new BadRequestError("Offer rate must be in betwwen 5% - 20% ");
      }

      const coupon = await this.couponRepository.editCoupon(
        couponId,
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode
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
