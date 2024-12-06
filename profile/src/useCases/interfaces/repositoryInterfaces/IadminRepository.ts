import { Iuser } from "../../../entities/user";

export interface IAdminRepository{
    findInstructors():Promise<Iuser[]|void>
    find():Promise<Iuser[]|void>
    findByEmail(email:string):Promise<Iuser|void>
    approveIntructor(email:string,status:string,instructor:boolean):Promise<Iuser|void>
}