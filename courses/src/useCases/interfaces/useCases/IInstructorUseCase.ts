import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";
import { ITest } from "../../../entities/test";
import { IRating } from "../../../entities/ratings";
import { Iuser } from "../../../entities/user";

export  interface  IInstructorUseCase {
   fetchCourses(instructorId:string,search : string,sort:string,page:number,next:NextFunction):Promise<ICourse[]|void>
   courseDetailes(courseId:string,next:NextFunction):Promise<ICourse|void>
   getStudents(instructorId:string,search : string,sort:string,page:string,next:NextFunction):Promise<Iuser[]|void>
   allCourses(next:NextFunction):Promise<ICourse[]|void>
   createCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   uploadVideo(sectionData:object,next:NextFunction):Promise<Boolean|void>
   editCourse(courseId:string,courseData:object,next:NextFunction):Promise<ICourse|void>
   editSection(sectionData:object,next:NextFunction):Promise<Boolean|void>
   listCourse(courseId:string,next:NextFunction):Promise<ICourse|void>
   addTest(courseId:string,testData:ITest,next:NextFunction):Promise<ITest|void>
   editTest(testId:string,testData:ITest,next:NextFunction):Promise<ITest|void>
   top5Courses(userId:string,next:NextFunction):Promise<ICourse[]|void>
   topRated(userId:string,next:NextFunction):Promise<IRating[]|void>
   testDetailes(testId:string):Promise<ITest|void>
}