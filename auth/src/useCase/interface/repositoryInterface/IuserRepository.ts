import { Iuser } from "../../../entities/user";

export interface IUserRepository{
    create(newUser: Iuser):Promise<Iuser|void>
    findByEmail(email:string):Promise<Iuser|void>
    findById(id:string):Promise<Iuser|void>
    signUp(email:string):Promise<string>
    update(id:string,name:string,email:string):Promise<Iuser|void>
}