import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";

interface Course{
    _id:string,
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
    imageUrl:string,
    videoUrl:string[],
    createdAt:string,
 }

export  interface  IUserUseCase {
    fetchCourses():Promise<ICourse[]|void>
    courseDetailes(courseId:string):Promise<ICourse|void>
    purchasedCourses(userId:string,next:NextFunction):Promise<ICourse[]|void>

 }