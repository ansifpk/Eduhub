import { User } from "./userType";


export interface IRating{
    _id:string,
    userId:User,
    courseId:string,
    review:string,
    stars:number,
    createdAt:string,
    updatedAt:string,
}