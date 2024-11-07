import { ICourse } from "../../../entities/course";

export interface IInstructorrepository{
    find():Promise<ICourse[]>
    create(courseData:ICourse):Promise<ICourse|void>
    list(courseId:string):Promise<ICourse|void>
    edit(courseData:ICourse):Promise<ICourse|void>
}