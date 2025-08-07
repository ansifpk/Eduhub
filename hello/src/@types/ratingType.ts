import type { IUser } from "./userType";


export interface IRating{
    _id:string,
    userId:IUser,
    courseId:string,
    review:string,
    stars:number,
    createdAt:string,
    updatedAt:string,
}