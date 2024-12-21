import { NextFunction } from "express"
import { ICoupon } from "../../../entities/coupon"
import { ICourse } from "../../../entities/course"


export interface IAdminUseCase{
   fetchCourses():Promise<ICourse[]>
   createCourse(courseData:ICourse):Promise<ICourse|void>
   editCourse(courseData:ICourse):Promise<ICourse|void>
   listCourse(courseId:string):Promise<ICourse|void>

   createCoupon(title:string,description:string,offer:number,date:Date,couponCode:string,next:NextFunction):Promise<ICoupon|void>
   editCoupon(couponId:string,title:string,description:string,offer:number,date:Date,couponCode:string,next:NextFunction):Promise<ICoupon|void>
   deleteCoupon(couponId:string,next:NextFunction):Promise<ICoupon|void>
   couponDetailes(couponId:string,next:NextFunction):Promise<ICoupon|void>
   getCoupons(next:NextFunction):Promise<ICoupon[]|void>
}