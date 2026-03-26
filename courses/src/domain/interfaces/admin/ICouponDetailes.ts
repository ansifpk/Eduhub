import { ICoupon } from "../../entities/coupon";

export interface ICouponDetailes{
    execute(input: {
    _id: string;
  }):Promise<void | ICoupon>
}