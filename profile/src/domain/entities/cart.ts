import { ICourse } from "./course";

export interface ICart{
    _id:string,
    userId:string,
    courses:ICourse[],
}