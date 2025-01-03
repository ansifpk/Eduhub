import { User } from "./userType";


export interface IInstructorRating{
    _id:string,
    userId:User,
    instructor:string,
    review:string,
    stars:number,
    createdAt:string,
    updatedAt:string,
}