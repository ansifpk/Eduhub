import { Iuser } from "./user";

export interface ICoupon{
    _id:string,
    title:string,
    couponCode:string,
    description:string,
    offer:number,
    expiryDate:Date,
    startingDate:Date,
    users:string[],
    createdAt:Date,
    updatedAt:Date,
}
