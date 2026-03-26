import { ICoupon } from "../../entities/coupon";

export interface IEditCoupon{
    execute(input: {
        couponId: string;
        title: string;
        description: string;
        offer: number;
        startingDate: string;
        expiryDate: string;
        couponCode: string;
      }): Promise<void | ICoupon>
}