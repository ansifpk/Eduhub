import { Iuser } from "../../../entities/user";

export interface IUserRepository{
    findById(userId:string):Promise<Iuser|void>
}