import { Iuser } from "../../../entities/user"

export interface IUserRepository{
    create(newUser: Iuser):Promise<Iuser>
    findByEmail(email:string):Promise<Iuser|null>
    findById(id:string):Promise<Iuser|null>
    update(id:string,name:string,email:string):Promise<Iuser|null>
    updatePassword(userId:string,password:string):Promise<Iuser|null>
    changeEmail(userId:string,email:string):Promise<Iuser|null>
}