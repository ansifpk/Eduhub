import { Query } from "mongoose";
import { ICoupon } from "../../../domain/entities/coupon";
import { ICourse } from "../../../domain/entities/course";
import { IRating } from "../../../domain/entities/ratings";
import { IReport } from "../../../domain/entities/report";
import { ITest } from "../../../domain/entities/tests";
import { IUserRepository } from "../../../domain/interfaces/repository/IUserRepository";
import { couponModel } from "../models/couponsModel";
import { Course } from "../models/courseModel";
import { ratingModel } from "../models/ratingModel";
import { reportModel } from "../models/reportModel";
import { testModel } from "../models/testModel";
import { IQuery } from "../../../domain/interfaces/IQuery";




export class UserRepository implements IUserRepository{

    constructor(
        private courseModel:typeof Course,
        private ratingModels:typeof ratingModel,
        private couponModels:typeof couponModel,
        private testModels:typeof testModel,
        private reportModels:typeof reportModel,
    ){

    }

     async  getPages(search: string, category: string, level: string, topic: string): Promise<number | void> {
        try {
          let queryData:any = {isListed:true}
       
            
            
        
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
        const limit = 8
        const pages = await this.courseModel.countDocuments(
            queryData
        )
        
        const  count = Math.ceil(pages / limit)
         if(pages>=0){
             return count;
         }
         
        } catch (error) {
          console.error(error)
        }
      }

    async checkReport(userId: string, content: string, courseId: string): Promise<IReport | void> {
      try {
        const report  = await this.reportModels.findOne({userId:userId,courseId:courseId,content})
        if(report){
          return report
        }
       } catch (error) {
        console.error(error)
       }
    }

     async findReports(userId: string, courseId: string): Promise<IReport[] | void> {
       try {
        const report  = await this.reportModels.find({userId:userId,courseId:courseId}).populate('userId')
        if(report){
          return report
        }
       } catch (error) {
        console.error(error)
       }
      }
  async createReport(userId: string, report: string, content: string, courseId: string): Promise<IReport|void> {
    try {
       const reportCreate = await this.reportModels.create({
        userId,
        report,
        content,
        courseId
       })
       if(reportCreate){
        return reportCreate
       }
    } catch (error) {
      console.error(error)
    }
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
        const courses = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1}).populate("instructorId").populate("students")
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

    async find(query:IQuery): Promise<ICourse[] | void> {
       try {
        const {search,category,level,topic,sort,page} = query
        
         
        let queryData:any = {isListed:true}
        let sortQuery:any = {}
            
            switch (sort) {
                case "Price Low to High":
                  sortQuery.price = 1
                  break;
                case "Price High to Low":
                  sortQuery.price = -1
                  break;
                case "Old":
                  sortQuery.createdAt = 1
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
            if(level == "All"){
                queryData.level = { $regex: "", $options: "i" };
             }else{
                queryData.level = { $regex: level, $options: "i" };
             }
           
        }
        if(search){
            queryData.title = {$regex:search,$options: "i"}
        }
        const limit = 8;
        const courses = await this.courseModel.find(
            queryData
        ).sort(sortQuery).skip(limit*(page-1)).limit(limit*page).populate("students").populate("instructorId")
        
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