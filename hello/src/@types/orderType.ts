import type { ICourse } from "./courseType";
import type { IUserProfile } from "./userProfile";

export interface IOrder{
    _id:string,
    user:IUserProfile,
    course:ICourse,
    createdAt:Date
}