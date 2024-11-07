import { ICourse } from "../../../entities/course";
import { IInstructorrepository } from "../repository/IInstructorRepository";


export  interface  IInstructorUseCase {
   fetchCourses():Promise<ICourse[]>
   createCourse(courseData:ICourse):Promise<ICourse|void>
   editCourse(courseData:ICourse):Promise<ICourse|void>
   listCourse(courseId:string):Promise<ICourse|void>
}