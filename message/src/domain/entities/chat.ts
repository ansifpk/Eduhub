import { IUser } from "./user";

export interface IChat{
    members:IUser[],
    createdAt :Date,
    isBlock:boolean,
    lastSeen:Date,
}