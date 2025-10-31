import { ICourse } from "./course";
import { Iuser } from "./user";

export interface IRating{
    userId:Iuser,
    courseId:ICourse,
    review:string,
    stars:number,
}