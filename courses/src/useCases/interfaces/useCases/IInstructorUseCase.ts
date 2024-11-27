import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";
import { IInstructorrepository } from "../repository/IInstructorRepository";
interface Course{
   _id?:string,
   title:string,
   instructorId?:string,
   subCategory:string,
   description:string,
   thumbnail:string,
   category:string,
   level:string,
   isListed:boolean,
   price:number,
   test?:[];
   subscription:boolean,
   videos:string[],
   image:string,
   imageUrl?:string,
   videoUrl?:string[],
   createdAt:string,
}

export  interface  IInstructorUseCase {
   fetchCourses(instructorId:string):Promise<ICourse[]|void>
   allCourses(next:NextFunction):Promise<ICourse[]|void>
   createCourse(courseData:object):Promise<ICourse|void>
   editCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   listCourse(courseId:string,next:NextFunction):Promise<ICourse|void>
}