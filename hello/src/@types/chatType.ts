import type { IUser } from "./userType";


export interface IChat{
    _id:string,
    createdAt:string,
    members:IUser[],
    role:string,
}