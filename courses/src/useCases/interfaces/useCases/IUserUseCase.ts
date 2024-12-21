import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";
import { Query } from "../../../framWorks/webServer/types/type";
import { IRating } from "../../../entities/ratings";

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
    fetchCourses(category:string,topic:string,level:string,search:string):Promise<ICourse[]|void>
    getCourses(instructorId:string,next:NextFunction):Promise<ICourse[]|void>
    courseDetailes(courseId:string):Promise<ICourse|void>
    purchasedCourses(userId:string,next:NextFunction):Promise<ICourse[]|void>
    ratingCourse(courseId:string,userId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    getRatings(courseId:string,next:NextFunction):Promise<IRating[]|void>
    updateRating(ratingId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    deleteRating(ratingId:string,next:NextFunction):Promise<IRating|void>

 }