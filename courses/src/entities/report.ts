import { ICourse } from "./course";
import { Iuser } from "./user";

export interface IReport{
    _id:string,
    report:string,
    content:string,
    courseId:ICourse,
    userId:Iuser,
    createdAt:Date
}