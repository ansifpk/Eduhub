import { ICoupon } from "../../entities/coupon";

export interface IUserGetCoupons{
   execute(): Promise<void | ICoupon[]> 
}