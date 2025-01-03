import { Iuser } from "./user";

export interface ICoupon{
    _id:string,
    title:string,
    couponCode:string,
    description:string,
    offer:number,
    expiryDate:string,
    startingDate:string,
    expiryTime:string,
    startingTime:string,
    users:string[],
    createdAt:string,
    updatedAt:string,
}
