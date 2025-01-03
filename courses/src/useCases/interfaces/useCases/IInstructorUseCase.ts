import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";
import { ITest } from "../../../entities/test";

export  interface  IInstructorUseCase {
   fetchCourses(instructorId:string,search : string,sort:string):Promise<ICourse[]|void>
   allCourses(next:NextFunction):Promise<ICourse[]|void>
   createCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   uploadVideo(sectionData:object,next:NextFunction):Promise<Boolean|void>
   editCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   editSection(sectionData:object,next:NextFunction):Promise<Boolean|void>
   listCourse(courseId:string,next:NextFunction):Promise<ICourse|void>
   addTest(courseId:string,testData:ITest,next:NextFunction):Promise<ITest|void>
   editTest(testId:string,testData:ITest,next:NextFunction):Promise<ITest|void>
}