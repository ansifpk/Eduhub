import { IRating } from "./ratingType"

export interface IUser{
    _id:string,
    name:string,
    email:string,
    isVerified:boolean,
    isBlock:boolean,
    instructorReviews?:IRating[],
    status: string,
    isAdmin:boolean,
    isInstructor:boolean,
    createdAt:string,
    avatar:{
        id:string,
        avatar_url:string
    }
}