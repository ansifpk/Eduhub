import type { IUser } from "./userType";

export interface IInstructorRating{
    _id:string,
    userId:IUser,
    instructor:string,
    review:string,
    stars:number,
    createdAt:string,
    updatedAt:string,
}