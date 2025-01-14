import { NextFunction } from "express"
import { ICoupon } from "../../../entities/coupon"
import { ICourse } from "../../../entities/course"
import { IReport } from "../../../entities/report"


export interface IAdminUseCase{
   fetchCourses(search:string,sort:string):Promise<ICourse[]|void>
   
   listCourse(courseId:string):Promise<ICourse|void>
   top5Courses(next:NextFunction):Promise<ICourse[]|void>

   createCoupon(title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string,next:NextFunction):Promise<ICoupon|void>
   editCoupon(couponId:string,title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string,next:NextFunction):Promise<ICoupon[]|void>
   deleteCoupon(couponId:string,next:NextFunction):Promise<ICoupon|void>
   couponDetailes(couponId:string,next:NextFunction):Promise<ICoupon|void>
   getCoupons(next:NextFunction):Promise<ICoupon[]|void>
   getReports(): Promise<IReport[] | void>
}