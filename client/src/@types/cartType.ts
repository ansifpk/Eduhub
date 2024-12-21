import { ICourse } from "./courseType";

export interface ICart{
    _id:string,
    userId:string,
    courses:ICourse[],
}