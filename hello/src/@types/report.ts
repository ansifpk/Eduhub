import type { ICourse } from "./courseType";
import type { IUser } from "./userType";

export interface IReport{
    _id:string,
    report:string,
    content:string,
    courseId:ICourse,
    userId:IUser,
    createdAt:Date
}