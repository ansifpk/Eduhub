import { User } from "./userType";

export interface ICoupon{
    _id?:string,
    title:string,
    couponCode:string,
    description:string,
    offer:string,
    expiryDate:string,
    startingDate:string,
    expiryTime:string,
    startingTime:string,
    users:string[]
    createdAt:string,
    updatedAt:string,
}
