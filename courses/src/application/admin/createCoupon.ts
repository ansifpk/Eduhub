import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { ICreateCoupon } from "../../domain/interfaces/admin/ICreateCoupon";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";

export class CreateCoupon
  implements ICreateCoupon{
  constructor(private readonly couponRepository: IAdminRepository) {}
  public async execute(input: {
    title: string;
    description: string;
    offer: number;
    startingDate: string;
    expiryDate: string;
    couponCode: string;
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
        throw new BadRequestError(ErrorMessages.COUPON_TITLE_VALIDATION);
      }
      if (description.length < 1) {
        throw new BadRequestError(ErrorMessages.COUPON_DESCRIPTION_VALIDATION);
      }
      if (expiryDate < startingDate) {
        throw new BadRequestError(
          ErrorMessages.COUPON_EXPIRY_DATE_VALIDATION
        );
      }
      const today = new Date().toISOString().slice(0, 16);
      if (today > startingDate) {
        throw new BadRequestError(
          ErrorMessages.COUPON_STARTING_DATE_VALIDATION
        );
      }

      if (offer < 5 || offer > 15) {
        throw new BadRequestError(ErrorMessages.COUPON_OFFER_VALIDATION);
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
      throw error;
    }
  }
}
