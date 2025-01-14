import { IUser } from "./chatUser";
import { ICourse } from "./courseType";

export interface IReport{
    _id:string,
    report:string,
    content:string,
    courseId:ICourse,
    userId:IUser,
    createdAt:Date
}