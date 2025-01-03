import { IUser } from "./chatUser";

export interface IChat{
    _id:string,
    createdAt:string,
    members:IUser[],
    role:string,
}