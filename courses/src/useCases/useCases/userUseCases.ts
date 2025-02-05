import { NextFunction } from "express";
import { ICourse } from "../../entities/course";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IStripe } from "../interfaces/service/stripe";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IRating } from "../../entities/ratings";
import { ICoupon } from "../../entities/coupon";
import { ITest } from "../../entities/test";
import { IReport } from "../../entities/report";
import { ErrorHandler } from "@eduhublearning/common";


export class UserUseCase implements IUserUseCase{

   constructor(
    private userRepository:IUserRepository,
    private s3bucketrepository:IS3bucket,
    private stripe:IStripe
   ){}

   async getReports(userId: string, courseId: string, next: NextFunction): Promise<IReport[] | void> {
      try {
        
         const reports = await this.userRepository.findReports(userId,courseId)
          if(reports){
            return reports
          }
         } catch (error) {
         console.error(error)
        }
     }

    async report(userId: string, report: string, content: string, courseId: string, next: NextFunction): Promise<IReport| void> {
     try {
      
      const course = await this.userRepository.findById(courseId);
      if(!course){
         return next(new ErrorHandler(400,"Course not found"));
      }

      const checkReport = await this.userRepository.checkReport(userId,content,courseId)
      if(checkReport){
         return next(new ErrorHandler(400,"Already report this video"));
      }
      const createReport = await this.userRepository.createReport(userId,report,content,courseId)
       if(createReport){
         return createReport
       }
   } catch (error) {
      console.error(error)
     }
   }

  async getTest(testId: string,next: NextFunction): Promise<ITest | void> {
       try {
         const test = await this.userRepository.findTest(testId);
         if(!test)  return next(new ErrorHandler(400,"Test Not found"))
       
         if(test){
         return test
         }
         } catch (error) {
            console.error(error)
         }
   }
  async submitTest(userId:string,testId: string,mark:number,next: NextFunction): Promise<ITest | void> {
       try {
         const test = await this.userRepository.findTest(testId);
         if(!test)  return next(new ErrorHandler(400,"Test Not found"))
          
            const updatedTest = await this.userRepository.submitTest(userId,testId,mark);
            if(updatedTest){
               return updatedTest;
            }
         
         } catch (error) {
            console.error(error)
         }
   }
   

   //TODO Coupon

   async addUserToCoupon(couponId: string, userId: string, next: NextFunction): Promise<ICoupon | void> {
      try {
         const checkCoupon = await this.userRepository.findCoupon(couponId);
         if(!checkCoupon)  return next(new ErrorHandler(400,"Coupon Not found"))
         const coupons  = await this.userRepository.useCoupon(couponId,userId);
      if(coupons){
       return coupons
      }
      } catch (error) {
         console.error(error)
      }
   }

   async findCouponByCode(couponCode:string,next:NextFunction): Promise<ICoupon|void> {
      try {
         const coupons  = await this.userRepository.findByCouponCode(couponCode);
      if(coupons){
       return coupons
      }
      } catch (error) {
         console.error(error)
      }
   }

   async fetchCoupons(): Promise<ICoupon[] | void> {
      const coupons  = await this.userRepository.Coupons();
      if(coupons){
       return coupons
      }
   }

   async couponDetailes(couponCode: string, next: NextFunction): Promise<ICoupon | void> {

      const coupons  = await this.userRepository.findByCouponCode(couponCode);
      console.log();
      
      if(coupons){

         //* return the coupon detailes
          return coupons

      }else{

         //! coupon not fund error

         return next(new ErrorHandler(400,"Invalid coupon code"))
      }
   }

    //TODO Ratings

  async deleteRating(ratingId: string, next: NextFunction): Promise<IRating | void> {
     try {
        const checkRating  = await this.userRepository.findRating(ratingId);
        if(!checkRating){
         return next(new ErrorHandler(400,"rating not found"));
        }

        const rating = await this.userRepository.deleteRating(ratingId);
        if(rating){
         return rating
        }

     } catch (error) {
      console.error(error)
     }
   }

   async updateRating(ratingId: string, review: string, stars: number, next: NextFunction): Promise<IRating | void> {
      try {
          const rating = await this.userRepository.findRating(ratingId);
          if(!rating){
            return next(new ErrorHandler(400,"Rating not Found"))
          }
          const updatedRating = await this.userRepository.editRating(ratingId,review,stars);
          if(updatedRating){
            return updatedRating;
          }
      } catch (error) {
         console.error(error)
      }
   }

   async getRatings(courseId: string, next: NextFunction): Promise<IRating[] | void> {
      try {
         const course = await this.userRepository.findById(courseId);
         if(!course){
            return next(new ErrorHandler(400,"Course not found"));
         }
         const ratings = await this.userRepository.ratings(courseId);
         if(ratings){
            return ratings
         }
      } catch (error) {
         console.error(error)
      }
   }

   
   async ratingCourse(courseId:string,userId:string,review:string,stars:number,next:NextFunction): Promise<IRating | void> {
      try {
            const course = await this.userRepository.findById(courseId);
            if(!course){
               return next(new ErrorHandler(400,"Course not Found"))
            }
            const checkRatings = await this.userRepository.checkRating(courseId,userId);
            if(checkRatings){
              return next(new ErrorHandler(400,"ALready Rated this course."))
            }
            const rating =  await this.userRepository.createRating(courseId,userId,review,stars,)
            if(rating){
               return rating;
            }
      } catch (error) {
        console.error(error)
      }
   }

    //TODO Courses
    
    async getCourses(instructorId: string, next: NextFunction): Promise<ICourse[] | void> {
       try {
         const courses = await this.userRepository.courses(instructorId)
         if(courses){
            return courses;
         }
       } catch (error) {
        console.error(error)
       }
    }

    async purchasedCourses(userId: string, next: NextFunction): Promise<ICourse[] | void> {
       try {
        const courses = await this.userRepository.findWithCondition(userId)
        if(courses){
            return courses;
        }
       } catch (error) {
        console.error(error)
       }
    }

    async fetchCourses(category:string,topic:string,level:string,search:string, sort : string,page:number): Promise<{courses:ICourse[],pages:number}|void> {
        try {
           
    
          const count = await this.userRepository.getPages( 
            search,
            category,
            level,
            topic,
            sort);
            console.log(count);
            const pages = count as number 
            const courses = await this.userRepository.find({
                page:page,
                search,
                category,
                level,
                topic,
                sort
            })
            if(courses && pages>=0) {
               return {courses,pages}
           }
        } catch (error) {
            console.error(error)
        }
    }
    async courseDetailes(courseId: string): Promise<ICourse | void> {
       try {
             const course =  await this.userRepository.findById(courseId)
             if(course){
                return course;
             }
       } catch (error) {
         console.error(error)
       }
    }

}