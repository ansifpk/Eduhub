import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../insfrastructure/db/repositories/userRepository";
import { ICoupon } from "../../domain/entities/coupon";
import { NextFunction } from "express";

export class UserCouponDetailes implements IUseCase<{couponCode:string,userId:string, next:NextFunction},ICoupon|void> {

    constructor(private readonly userRepository:UserRepository) {}

    public async execute(input: {couponCode:string,userId:string, next:NextFunction}): Promise<void | ICoupon> {
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
              input.next(error);
              console.error(error)
            }
    }
}