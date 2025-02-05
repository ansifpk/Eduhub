import { NextFunction } from "express";
import { ICoupon } from "../../entities/coupon";
import { ICourse } from "../../entities/course";
import { IAdminRepository } from "../interfaces/repository/IAdminRepository";
import { IAdminUseCase } from "../interfaces/useCases/IadminUseCase";
import { IReport } from "../../entities/report";
import { ISection } from "../../entities/section";
import { ErrorHandler } from "@eduhublearning/common";

export class AdminUseCase implements IAdminUseCase{
    constructor(private adminRepository:IAdminRepository,){}

   

    async createCoupon(title: string, description: string, offer: number, startingDate:string, startingTime:string, expiryDate:string, expiryTime:string, couponCode: string, next: NextFunction): Promise<ICoupon | void> {
       try {
        const coupon = await this.adminRepository.createCoupon(title,description,offer,startingDate,startingTime,expiryDate,expiryTime,couponCode);
        if(coupon){
            return coupon
        }
       } catch (error) {
        console.error(error)
       }

    }
    async editCoupon(couponId: string, title: string, description: string, offer: number, startingDate:string, startingTime:string, expiryDate:string, expiryTime:string, couponCode: string, next: NextFunction): Promise<ICoupon[] | void> {
        try {
            const couponCheck = await this.adminRepository.findCouponById(couponId);

            if(!couponCheck){
                return next(new ErrorHandler(400,"Coupon Not found"))
            }
                
            const coupon = await this.adminRepository.editCoupon(couponId,title,description,offer,startingDate,startingTime,expiryDate,expiryTime,couponCode);
          
            if(coupon){
                const coupons = await this.adminRepository.coupons();
                return coupons
            }
           } catch (error) {
            console.error(error)
           }
    
    }
    async deleteCoupon(couponId: string, next: NextFunction): Promise<ICoupon | void> {
        try {
            
            const couponCheck = await this.adminRepository.findCouponById(couponId);

            if(!couponCheck){
                return next(new ErrorHandler(400,"Coupon Not found"))
            }
                
            
            const coupon = await this.adminRepository.deleteCoupon(couponId);
            if(coupon){
                return coupon
            }
           } catch (error) {
            console.error(error)
           }
    
    }

    async couponDetailes(couponId: string, next: NextFunction): Promise<ICoupon | void> {
        try {
            const coupon = await this.adminRepository.findCouponById(couponId);

            if(coupon){
                return coupon
            }else{
                return next(new ErrorHandler(400,"Coupon Not found"))
            }
           } catch (error) {
            console.error(error)
           }
    
    }
    async getReports(): Promise<IReport[] | void> {
        try {
             const reports = await this.adminRepository.findReports();
             if(reports){
                return reports;
             }
           } catch (error) {
            console.error(error)
           }
    
    }
    async getCoupons(next: NextFunction): Promise<ICoupon[] | void> {
        try {
            const coupon = await this.adminRepository.coupons();
            if(coupon){
                return coupon
            }
           } catch (error) {
            console.error(error)
           }
    
    }
    async fetchCourses(search:string,sort:string,page:number): Promise<{courses:ICourse[],pages:number}|void> {
      try {

        const count = await this.adminRepository.getPages(search,sort);
        const pages = count as number 
        const courses = await this.adminRepository.find(search,sort,page)
      
        if(courses && pages>=0) {
            return {courses,pages}
        }
      } catch (error) {
        console.error(error)
      }
    }

    async top5Courses(next: NextFunction): Promise<ICourse[] | void> {
        try {
            const courses = await this.adminRepository.findTop5()
            if(courses) return courses
          } catch (error) {
            console.error(error)
          }
    }
    
    async top5RatedCourses(next: NextFunction): Promise<ICourse[] | void> {
        try {
                const courses = await this.adminRepository.top5Rated()
                const data = courses?.filter((value)=>value.courseReviews?.length!>0)
                let topCourse = data?.filter((value)=>value.courseReviews?.find((val)=>val.stars>=2.5))
                if(topCourse){
                    return topCourse.slice(0,5)
                } 
           
          } catch (error) {
            console.error(error)
          }
    }

    async deletLecture(lectureUrl:string,next:NextFunction):Promise<ISection|void> {
        try {
            const reports  =  await this.adminRepository.findReportsByUrl(lectureUrl);
           const section = await this.adminRepository.deleteLecture(lectureUrl);
           if(section){
            return section;
           }
            
          } catch (error) {
            console.error(error)
          }
    }
    
} 