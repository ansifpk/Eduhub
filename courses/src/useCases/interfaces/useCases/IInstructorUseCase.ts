import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";

import { IInstructorrepository } from "../repository/IInstructorRepository";
import { ISection } from "../../../entities/section";
import { Section } from "../../../framWorks/webServer/types/type";
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
interface FileData {
   fieldname: string;
   originalname: string;
   encoding: string;
   mimetype: string;
   buffer: Buffer;
   size: number;
 }
 
export  interface  IInstructorUseCase {
   fetchCourses(instructorId:string):Promise<ICourse[]|void>
   allCourses(next:NextFunction):Promise<ICourse[]|void>
   createCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   uploadVideo(sectionData:object,next:NextFunction):Promise<Boolean|void>
   editCourse(courseData:object,next:NextFunction):Promise<ICourse|void>
   editSection(sectionData:object,next:NextFunction):Promise<Boolean|void>
   listCourse(courseId:string,next:NextFunction):Promise<ICourse|void>
}