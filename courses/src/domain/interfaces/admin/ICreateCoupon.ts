import { ICoupon } from "../../entities/coupon";

export interface ICreateCoupon{
    execute(input: {
    title: string;
    description: string;
    offer: number;
    startingDate: string;
    expiryDate: string;
    couponCode: string;
}):Promise<void|ICoupon>
}