import { NextFunction } from "express";
import { ICourse } from "../../../entities/course";
import { IRating } from "../../../entities/ratings";
import { ICoupon } from "../../../entities/coupon";
import { ITest } from "../../../entities/test";
import { IReport } from "../../../entities/report";

export  interface  IUserUseCase {
    //course
    fetchCourses(category:string,topic:string,level:string,search:string, sort : string,page:number):Promise<{courses:ICourse[],pages:number}|void>
    getCourses(instructorId:string,next:NextFunction):Promise<ICourse[]|void>
    courseDetailes(courseId:string):Promise<ICourse|void>
    purchasedCourses(userId:string,next:NextFunction):Promise<ICourse[]|void>
    report(userId:string,report:string,content:string,courseId:string,next:NextFunction):Promise<IReport|void>
    getReports(userId:string,courseId:string,next:NextFunction):Promise<IReport[]|void>
    //rating
    ratingCourse(courseId:string,userId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    getRatings(courseId:string,next:NextFunction):Promise<IRating[]|void>
    updateRating(ratingId:string,review:string,stars:number,next:NextFunction):Promise<IRating|void>
    deleteRating(ratingId:string,next:NextFunction):Promise<IRating|void>
     //coupons
     fetchCoupons():Promise<ICoupon[]|void>
     findCouponByCode(couponCode:string,next:NextFunction):Promise<ICoupon|void>
     couponDetailes(couponCode:string,next:NextFunction):Promise<ICoupon|void>
     addUserToCoupon(couponId:string,userId:string,next:NextFunction):Promise<ICoupon|void>
     getTest(testId:string,next:NextFunction):Promise<ITest|void>
     submitTest(userId:string,testId:string,mark:number,next:NextFunction):Promise<ITest|void>
   
 }