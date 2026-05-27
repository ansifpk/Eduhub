import { Iuser } from "../../../entities/user"
import { IInstructor } from "../../IInstructorInterface"


export interface IInstructorRepository{
    find():Promise<Iuser[]|null>
    findByEmail(email:string):Promise<Iuser|null>
    findById(id:string):Promise<Iuser|null>
    update(id:string,email:string,name:string):Promise<Iuser|null>
    create(instructorData:IInstructor):Promise<Iuser>
    makeInstructor(email:string):Promise<Iuser|null>
}