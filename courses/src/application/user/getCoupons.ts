import { ICoupon } from "../../domain/entities/coupon";
import { IUserGetCoupons } from "../../domain/interfaces/user/IUserGetCoupons";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";

export class UserGetCoupons
  implements IUserGetCoupons{
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(): Promise<void | ICoupon[]> {
    try {
      const coupons = await this.userRepository.Coupons();
      if (coupons) {
        return coupons;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
