import { Iuser } from "../entities/user"
import { IInstructor } from "./IInstructorInterface"

export interface IInstructorRepository{
    find():Promise<Iuser[]|void>
    findByEmail(email:string):Promise<Iuser|void>
    findById(id:string):Promise<Iuser|void>
    update(id:string,email:string,name:string):Promise<Iuser|void>
    create(instructorData:IInstructor):Promise<Iuser|void>
    makeInstructor(email:string):Promise<Iuser|void>
}