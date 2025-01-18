import { NextFunction } from "express"
import { ICoupon } from "../../../entities/coupon"
import { ICourse } from "../../../entities/course"
import { IReport } from "../../../entities/report"
import { ISection } from "../../../entities/section"


export interface IAdminUseCase{
   fetchCourses(search:string,sort:string,page:number):Promise<{courses:ICourse[],pages:number}|void>
   top5Courses(next:NextFunction):Promise<ICourse[]|void>
   top5RatedCourses(next:NextFunction):Promise<ICourse[]|void>
   deletLecture(lectureUrl:string,next:NextFunction):Promise<ISection|void>
   createCoupon(title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string,next:NextFunction):Promise<ICoupon|void>
   editCoupon(couponId:string,title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string,next:NextFunction):Promise<ICoupon[]|void>
   deleteCoupon(couponId:string,next:NextFunction):Promise<ICoupon|void>
   couponDetailes(couponId:string,next:NextFunction):Promise<ICoupon|void>
   getCoupons(next:NextFunction):Promise<ICoupon[]|void>
   getReports(): Promise<IReport[] | void>
}