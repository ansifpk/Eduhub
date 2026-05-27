import { Iuser } from "../../../entities/user"


export interface IAdminRepository{
    find():Promise<Iuser[]|null>
    findById(userId:string):Promise<Iuser|null>
    findByEmail(email:string):Promise<Iuser|null>
    block(student:Iuser):Promise<Iuser|null>
    update(adminId:string,name:string,email:string):Promise<Iuser|null>
    create(userData:Iuser):Promise<Iuser>
}