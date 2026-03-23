import { ICoupon } from "../../domain/entities/coupon";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminRepository";
import { IGetCoupon } from "../../domain/interfaces/admin/IGetCoupon";

export class GetCoupons
  implements IGetCoupon {
  constructor(private readonly couponRepository: IAdminRepository) {}
  public async execute(input: {
    search: string;
    sort: string;
    page: string;
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
      throw error;
    }
  }
}
