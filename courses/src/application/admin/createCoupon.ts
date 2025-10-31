import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { NextFunction } from "express";
import { AdminRepository } from "../../insfrastructure/db/repositories/adminRepository";

export class CreateCoupon
  implements
    IUseCase<
      {
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
        title,
        description,
        offer,
        startingDate,
        expiryDate,
        couponCode,
      } = input;
      if (title.length < 1) {
        throw new BadRequestError("Pleaseprovide a valid title");
      }
      if (description.length < 1) {
        throw new BadRequestError("Pleaseprovide a valid description");
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
      const coupon = await this.couponRepository.createCoupon(
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
