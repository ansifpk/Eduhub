import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { ICoupon } from "../../domain/entities/coupon";
import { IUserRepository } from "../../domain/interfaces/repository/IUserRepository";
import { ICouponDetailes } from "../../domain/interfaces/user/ICouponDetailes";

export class UserCouponDetailes implements ICouponDetailes {

    constructor(private readonly userRepository:IUserRepository) {}

    public async execute(input: {couponCode:string,userId:string}): Promise<void | ICoupon> {
        try {
              const today = new Date();
              const {couponCode,userId} = input;
              const coupons = await this.userRepository.findByCouponCode(couponCode);
        
              if (!coupons) {
                //! coupon not fund error
                throw new BadRequestError(ErrorMessages.INVALID_COUPON_CODE);
              }
        
              if (coupons.users.includes(userId)) {
                throw new BadRequestError(ErrorMessages.COUPON_USED);
              }
        
              if (new Date(coupons.expiryDate) < today) {
                throw new BadRequestError(ErrorMessages.COUPON_EXPIRED);
              }
        
              if (coupons) {
                //* return the coupon detailes
                return coupons;
              }
            } catch (error) {
              console.error(error)
              throw error;
            }
    }
}