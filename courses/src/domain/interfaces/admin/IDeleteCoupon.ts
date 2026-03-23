import { ICoupon } from "../../entities/coupon";

export interface IDeleteCoupon{
    execute(input: {
    _id: string;
  }):Promise<ICoupon|void>
}