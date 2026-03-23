import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { IEditCoupon } from "../../domain/interfaces/admin/IEditCoupon";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";

export class EditCoupon
  implements IEditCoupon{
  constructor(private readonly couponRepository: IAdminRepository) {}
  public async execute(input: {
    couponId: string;
    title: string;
    description: string;
    offer: number;
    startingDate: string;
    expiryDate: string;
    couponCode: string;
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
        throw new BadRequestError(ErrorMessages.COUPON_TITLE_VALIDATION);
      }
      if (description.length < 1) {
        throw new BadRequestError(ErrorMessages.COUPON_DESCRIPTION_VALIDATION);
      }
      if (!couponCheck) {
        throw new BadRequestError(ErrorMessages.COUPON_NOT_FOUND);
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
        throw new BadRequestError(ErrorMessages.COUPON_STARTING_DATE_VALIDATION);
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
      throw error;
    }
  }
}
