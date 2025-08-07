import type { IUser } from "./userType";

export interface ISubcription{
    _id:string,
    price:number,
    plan:string,
    instructorId:IUser,
    description:string[],
    users:IUser[],
    createdAt:string
}