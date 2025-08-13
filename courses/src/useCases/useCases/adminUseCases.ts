import { NextFunction } from "express";
import { ICoupon } from "../../entities/coupon";
import { ICourse } from "../../entities/course";
import { IAdminRepository } from "../interfaces/repository/IAdminRepository";
import { IAdminUseCase } from "../interfaces/useCases/IadminUseCase";
import { IReport } from "../../entities/report";
import { ISection } from "../../entities/section";
import { BadRequestError, NotFoundError, StatusCodes } from "@eduhublearning/common";

export class AdminUseCase implements IAdminUseCase{
    constructor(private adminRepository:IAdminRepository,){}

   

    async createCoupon(title: string, description: string, offer: number, startingDate:string, expiryDate:string,couponCode: string, next: NextFunction): Promise<ICoupon | void> {
       try {
          if(title.length < 1){
                throw new BadRequestError("Pleaseprovide a valid title")
             }
             if(description.length < 1){
                throw new BadRequestError("Pleaseprovide a valid description")
             }
            if(expiryDate < startingDate){
                throw new BadRequestError("expiry Date date must be greaterthan Starting Date")
            }
            const today = new Date().toISOString().slice(0, 16);
            if(today > startingDate){
                throw new BadRequestError("Please set the starting date as today or day that is grater than today")
            }

            if(offer < 5 || offer > 15){
                throw new BadRequestError("Offer rate must be in betwwen 5% - 20% ")
            }
        const coupon = await this.adminRepository.createCoupon(title,description,offer,startingDate,expiryDate,couponCode);
        if(coupon){
            return coupon
        }
       } catch (error) {
        console.error(error)
       }

    }
    async editCoupon(couponId: string, title: string, description: string, offer: number, startingDate:string,expiryDate:string, couponCode: string, next: NextFunction): Promise<ICoupon | void> {
        try {
            const couponCheck = await this.adminRepository.findCouponById(couponId);
             if(title.length < 1){
                throw new BadRequestError("Pleaseprovide a valid title")
             }
             if(description.length < 1){
                throw new BadRequestError("Pleaseprovide a valid description")
             }
            if(!couponCheck){
                throw new BadRequestError("Coupon Not found")
            }
            if(expiryDate < startingDate){
                throw new BadRequestError("expiry Date date must be greaterthan Starting Date")
            }
            const today = new Date().toISOString().slice(0, 16);
            if(today > startingDate){
                throw new BadRequestError("Please set the starting date as today or day that is grater than today")
            }

            if(offer < 5 || offer > 15){
                throw new BadRequestError("Offer rate must be in betwwen 5% - 20% ")
            }

                
            const coupon = await this.adminRepository.editCoupon(couponId,title,description,offer,startingDate,expiryDate,couponCode);
          
            if(coupon){
                return coupon
            }
           } catch (error) {
            console.error(error)
            next(error);
           }
    
    }
    async deleteCoupon(couponId: string, next: NextFunction): Promise<ICoupon | void> {
        try {
            
            const couponCheck = await this.adminRepository.findCouponById(couponId);

            if(!couponCheck){
                throw new NotFoundError("Coupon Not found")
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
                throw new NotFoundError("Coupon Not found")
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
    async getCoupons(search:string,sort:string,page:string,next: NextFunction): Promise<ICoupon[] | void> {
        try {
            const coupon = await this.adminRepository.coupons(search,sort,page);
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