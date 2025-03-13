import { IRating } from "../../../entities/ratings";
import { Iuser } from "../../../entities/user";

export interface IAdminRepository{
    findInstructors(search:string,sort:string,page:number):Promise<Iuser[]|void>
    find(search:string,sort:string,page:number):Promise<Iuser[]|void>
    getUserPages(search:string,sort:string):Promise<number|void>
    getInstructorPages(search:string,sort:string):Promise<number|void>
    findByEmail(email:string):Promise<Iuser|void>
    approveIntructor(email:string,status:string,instructor:boolean):Promise<Iuser|void>
    findIntructorRequests():Promise<Iuser[]|void>
    findTop5Instructors():Promise<Iuser[]|void>
    
}