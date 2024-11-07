import { ICourse } from "../../../entities/course"


export interface IAdminUseCase{
   fetchCourses():Promise<ICourse[]>
   createCourse(courseData:ICourse):Promise<ICourse|void>
   editCourse(courseData:ICourse):Promise<ICourse|void>
   listCourse(courseId:string):Promise<ICourse|void>
}