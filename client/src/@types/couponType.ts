import { User } from "./userType";

export interface ICoupon{
    _id?:string,
    title:string,
    couponCode:string,
    description:string,
    offer:string,
    expiryDate:string,
    createdAt:string,
    users:User[]
    updatedAt:string,
}
