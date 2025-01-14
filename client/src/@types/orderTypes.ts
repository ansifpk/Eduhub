import { IUser } from "./chatUser";
import { ICourse } from "./courseType";

export interface IOrder{
    _id:string,
    user:IUser,
    course:ICourse,
    createdAt:Date
}