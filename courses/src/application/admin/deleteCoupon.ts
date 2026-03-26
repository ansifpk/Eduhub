import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { IDeleteCoupon } from "../../domain/interfaces/admin/IDeleteCoupon";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";

export class DeleteCoupon
  implements IDeleteCoupon{
  constructor(private readonly couponRepository: IAdminRepository) {}
  public async execute(input: {
    _id: string;
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
      throw error;
    }
  }
}
