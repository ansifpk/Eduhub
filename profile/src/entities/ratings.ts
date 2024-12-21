import { Iuser } from "./user";

export interface IRating{
    userId:Iuser,
    instructorId:Iuser,
    review:string,
    stars:number,
}