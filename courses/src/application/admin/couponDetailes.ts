import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";
import { ICouponDetailes } from "../../domain/interfaces/admin/ICouponDetailes";

export class CouponDetailes
  implements ICouponDetailes{
  constructor(private readonly couponRepository: IAdminRepository) {}
  public async execute(input: {
    _id: string;
  }): Promise<void | ICoupon> {
    try {
      const coupon = await this.couponRepository.findCouponById(input._id);

      if (coupon) {
        return coupon;
      } else {
        throw new BadRequestError(ErrorMessages.COUPON_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
