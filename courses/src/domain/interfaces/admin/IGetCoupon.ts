import { ICoupon } from "../../entities/coupon";

export interface IGetCoupon{
     execute(input: {
    search: string;
    sort: string;
    page: string;
  }): Promise<void | ICoupon[]>
}