import { IUser } from "./user";

export interface IChat{
    members:IUser[],
    createdAt :Date,
}