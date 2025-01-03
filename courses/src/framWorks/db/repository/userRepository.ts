import mongoose from "mongoose";
import { ICourse } from "../../../entities/course";
import { IUserRepository } from "../../../useCases/interfaces/repository/IUserRepository";
import { Query } from "../../webServer/types/type";
import { Course } from "../mongodb/models/courseModel";
import { IRating } from "../../../entities/ratings";
import { ratingModel } from "../mongodb/models/ratingModel";
import { ICoupon } from "../../../entities/coupon";
import { couponModel } from "../mongodb/models/couponsModel";
import { ITest } from "../../../entities/test";
import { testModel } from "../mongodb/models/testModel";
import { ALL } from "dns";



export class UserRepository implements IUserRepository{

    constructor(
        private courseModel:typeof Course,
        private ratingModels:typeof ratingModel,
        private couponModels:typeof couponModel,
        private testModels:typeof testModel,
    ){

    }

    async findTest(testId: string): Promise<ITest | void> {
        try {
            const test = await this.testModels.findById({_id:testId});
            if(test){
              return test;
            }
           } catch (error) {
            console.error(error)
           }
    }
    async submitTest(userId:string,testId: string,mark:number): Promise<ITest | void> {
        try {
            const test = await this.testModels.findByIdAndUpdate({_id:testId},{$addToSet:{students:{user:userId,score:mark}}},{new:true});
            if(test){
              return test;
            }
           } catch (error) {
            console.error(error)
           }
    }
   
  

    //coupon

    async useCoupon(couponId: string, userId: string): Promise<ICoupon | void> {
        try {
            const coupon = await this.couponModels.findByIdAndUpdate({_id:couponId},{$addToSet:{users:userId}},{new:true});
            if(coupon){
              return coupon;
            }
           } catch (error) {
            console.error(error)
           }
    }

    async Coupons(): Promise<ICoupon[] | void> {
       try {
        const coupon = await this.couponModels.find();
        if(coupon){
          return coupon;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async findCoupon(couponId: string): Promise<ICoupon| void> {
        try {
            const coupon = await this.couponModels.findById({_id:couponId});
            if(coupon){
              return coupon;
            }
          } catch (error) {
           console.error(error)
          }
    }

    async findByCouponCode(couponCode: string): Promise<ICoupon | void> {
       try {
        const coupon = await this.couponModels.findOne({couponCode:couponCode});
        if(coupon){
          return coupon;
        }
       } catch (error) {
        console.error(error)
       }
    }

   async checkRating(courseId: string, userId: string): Promise<IRating | void> {
       try {
          const rating = await this.ratingModels.findOne({userId:userId,courseId:courseId});
          if(rating){
            return rating;
          }
       } catch (error) {
        console.error(error)
       }
    }

    async findRating(ratingId: string): Promise<IRating | void> {
       try {
         const rating = await this.ratingModels.findById({_id:ratingId})
         if(rating){
            return rating
         }
       } catch (error) {
        console.error(error)
       }
    }

   async ratings(courseId: string): Promise<IRating[] | void> {
       try {
          const ratings = await this.ratingModels.find({courseId:courseId}).populate("userId")
          if(ratings){
            return ratings;
          }
       } catch (error) {
        console.error(error)
       }
    }
    async createRating(courseId: string,userId:string,review:string,stars:number): Promise<IRating | void> {
        try {
            const rating = await this.ratingModels.create({
                review:review,
                stars:stars,
                courseId:courseId,
                userId:userId
            });
            if(rating){
                return rating;
            }
          } catch (error) {
           console.error(error)
          }
    }
    async editRating(ratingId: string,review:string,stars:number): Promise<IRating | void> {
        try {
            const rating = await this.ratingModels.findByIdAndUpdate({_id:ratingId},{$set:{review:review,stars:stars}},{new:true})
            if(rating){
                return rating;
            }
          } catch (error) {
           console.error(error)
          }
    }
    async deleteRating(ratingId: string): Promise<IRating | void> {
        try {
           const rating = await this.ratingModels.findByIdAndDelete({_id:ratingId})
           if(rating){
            return rating
           }
          } catch (error) {
           console.error(error)
          }
    }
    
    async courses(instructorId: string): Promise<ICourse[] | void> {
       try {
        const courses = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1}).populate("instructorId")
        if(courses){
            return courses;
        }
       } catch (error) {
        console.error(error)
       }
    }

    async findWithCondition(userId: string): Promise<ICourse[] | void> {
        try {
           
            const courses = await this.courseModel.find({ students: userId} ).populate("instructorId").populate("students")
            if(courses){
                return courses
            }
            
        } catch (error) {
            console.error(error)
        }
       
    }

    async find(query:Query): Promise<ICourse[] | void> {
       try {
        const {page,search,category,level,topic,sort} = query

        let queryData:any = {isListed:true}
        let sortQuery:any = {}
            
            switch (sort) {
                case "All":
                  sortQuery.createdAt = -1
                  break;
                case "Price Low to High":
                  sortQuery.price = 1
                  break;
                case "Price High to Low":
                  sortQuery.price = -1
                  break;
                case "Old":
                  sortQuery.createdAt = 1
                  break;
                case "New":
                    sortQuery.createdAt = -1
                    break;
                default:
                    sortQuery.createdAt = -1
                    break;
              }
        
        if(category){
            if(category == "All"){
                queryData.category = { $regex: "", $options: "i" };
             }else{
                 queryData.category = { $regex: category, $options: "i" };
             }
        }
        if(topic ){
            if(topic == "All"){
                queryData.subCategory = { $regex: "", $options: "i" };
             }else{
                queryData.subCategory = { $regex: topic, $options: "i" };
             }
           
        }
        if(level ){
            if(topic == "All"){
                queryData.level = { $regex: "", $options: "i" };
             }else{
                queryData.level = { $regex: level, $options: "i" };
             }
           
        }
        if(search){
            queryData.title = {$regex:search,$options: "i"}
        }
        let limit = 8
        
        const courses = await this.courseModel.find(
            queryData
        ).sort(sortQuery).populate("students").populate("instructorId")
         
       if(courses){
        return courses;
       }
       } catch (error) {
        console.error(error)
       }
    }
    async findById(courseId: string): Promise<ICourse | void> {
       try {
        const course = await this.courseModel.findById({_id:courseId}).populate("instructorId").populate("students").populate("sections").populate("test")
        if(course){
            return course
        }
       } catch (error) {
        console.error(error)
       }
    }
    
}