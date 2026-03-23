import { ICoupon } from "../../entities/coupon";

export interface ICouponDetailes{
   execute(input: {couponCode:string,userId:string}): Promise<void | ICoupon>
}