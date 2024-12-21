import { NextFunction } from "express";
import { ICourse } from "../../entities/course";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IStripe } from "../interfaces/service/stripe";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IRating } from "../../entities/ratings";
import ErrorHandler from "../middlewares/errorHandler";


export class UserUseCase implements IUserUseCase{

   constructor(
    private userRepository:IUserRepository,
    private s3bucketrepository:IS3bucket,
    private stripe:IStripe
   ){}

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

    async fetchCourses(category:string,topic:string,level:string,search:string): Promise<ICourse[] | void> {
        try {
           
    
let page 
            const courses = await this.userRepository.find({
                page:page,
                search,
                category,
                level,
                topic,
            })
            if(courses){
              
                
                return courses;
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
}