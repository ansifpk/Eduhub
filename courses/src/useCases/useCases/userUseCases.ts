import { NextFunction } from "express";
import { ICourse } from "../../entities/course";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IStripe } from "../interfaces/service/stripe";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { ICloudinary } from "../interfaces/service/Icloudinery";
import { Query } from "../../framWorks/webServer/types/type";
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
interface example{
    _id:string,
    title:string,
    instructorId:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test:[];
    subscription:boolean,
    videos:string[],
    image:string,
    imageUrl:string,
    videoUrl:string[],
    createdAt:string,
}
export class UserUseCase implements IUserUseCase{

   constructor(
    private userRepository:IUserRepository,
    private s3bucketrepository:IS3bucket,
    private stripe:IStripe
   ){}
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
  
  
  
  
  
  
  
  
  
  
  
  
   // async fetchCourses(): Promise<ICourse[] | void> {
    //      const courses = await this.userRepository.find();
    //      if(courses){
       
    //         for(let i=0;i<courses.length;i++){
    //             const objectParams = {
    //                 Key:courses[i].image
    //             }
    //             const url =  await this.s3bucketrepository.getGallery(objectParams);
    //             if(url){
    //                 courses[i].image = url;
    //             }
    //         }
    
    //         return courses
            
    //     }
    // }
    // async courseDetailes(courseId: string): Promise<ICourse | void> {
    //     const course = await this.userRepository.findById(courseId)
    //     if(course){
    //         const objectParams = {
    //             Key:course.image
    //         }
    //         const url = await this.s3bucketrepository.getGallery(objectParams);
    //         course.image = url!
    //         return course;
    //     }
      
    // }
    // async orderCourse(courseData: Course, next: NextFunction): Promise<ICourse | void> {
    //     throw new Error("Method not implemented.");
    // }
   
//     async orderCourse(courseData: Course): Promise<Course | void> {
       
//         const order = await this.orderCourse(courseData)
//         if(order){
//             return order
//         }

//     }
    
}