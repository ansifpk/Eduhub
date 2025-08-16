import { Iuser } from "../../../entities/user";

export interface IUserRepository{
    create(newUser: Iuser):Promise<Iuser|void>
    findByEmail(email:string):Promise<Iuser|void>
    findById(id:string):Promise<Iuser|void>
    update(id:string,name:string,email:string):Promise<Iuser|void>
    updatePassword(userId:string,password:string):Promise<Iuser|void>
    changeEmail(userId:string,email:string):Promise<Iuser|void>
}