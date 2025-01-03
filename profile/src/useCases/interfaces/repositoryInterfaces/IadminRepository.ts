import { Iuser } from "../../../entities/user";

export interface IAdminRepository{
    findInstructors(search:string,sort:string):Promise<Iuser[]|void>
    find(search:string,sort:string):Promise<Iuser[]|void>
    findByEmail(email:string):Promise<Iuser|void>
    approveIntructor(email:string,status:string,instructor:boolean):Promise<Iuser|void>
}