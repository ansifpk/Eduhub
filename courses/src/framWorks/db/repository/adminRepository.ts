import { ICoupon } from "../../../entities/coupon";
import { ICourse } from "../../../entities/course";
import { IReport } from "../../../entities/report";
import { IAdminRepository } from "../../../useCases/interfaces/repository/IAdminRepository";
import { couponModel } from "../mongodb/models/couponsModel";
import { Course } from "../mongodb/models/courseModel";
import { reportModel } from "../mongodb/models/reportModel";

export class AdminRepository implements IAdminRepository{
    constructor(
        private courseModel:typeof Course,
        private couponModels:typeof couponModel,
        private reportModels:typeof reportModel,

    ){}
   

    async findReports(): Promise<IReport[] | void> {
       try {
        const reports = await this.reportModels.find().sort({createdAt:-1}).populate("courseId").populate("userId");
        if(reports){
            return reports
        }
       } catch (error) {
        console.error(error)
       }
    }
    async createCoupon(title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string):Promise<ICoupon|void>{
        try {
            const coupon = await this.couponModels.create({
               title,
               startingDate,
               expiryDate,
               startingTime,
               expiryTime,
               offer,
               description,
               couponCode

            })
            if(coupon){
               return coupon;
            }
        } catch (error) {
           console.error(error)
        }
   }
    async deleteCoupon(couponId: string): Promise<ICoupon | void> {
        try {
            const couponse = await this.couponModels.findByIdAndDelete({_id:couponId});
            if(couponse){
                return couponse
            }
           } catch (error) {
            console.error(error)
           }
    }
   async editCoupon(couponId: string, title: string, description: string, offer: number, startingDate:string,startingTime:string,expiryDate:string,expiryTime:string, couponCode: string): Promise<ICoupon | void> {
    try {
        
        const couponse = await this.couponModels.findByIdAndUpdate({_id:couponId},{$set:{title:title,description:description,offer:offer,startingDate:startingDate,expiryDate:expiryDate,startingTime:startingTime,expiryTime,couponCode:couponCode}},{new:true});
        if(couponse){
            return couponse
        }
       } catch (error) {
        console.error(error)
       }
    }
    async coupons(): Promise<ICoupon[] | void> {
       try {
        const couponse = await this.couponModels.find().sort({createdAt:-1});
        if(couponse){
            return couponse
        }
     
   
       } catch (error) {
        console.error(error)
       }
    }
    async find(search:string,sort:string): Promise<ICourse[]|void> {
       try {
        console.log(search,sort,"repo");
        let queryData:any = {}
        let sortQuery:any = {}
            
            switch (sort) {
                case "All":
                  sortQuery.createdAt = -1
                  break;
                case "Name Aa-Zz":
                  sortQuery.name = 1
                  break;
                case "Name Zz-Aa":
                  sortQuery.name = -1
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
        
              if(search){
                queryData.title = {$regex:search,$options: "i"}
              }
        const courses =  await this.courseModel.find(queryData).sort(sortQuery).populate("students").populate("sections");
        if(courses){
            return courses;
        }
       } catch (error) {
        console.error(error)
       }
    }
  
    list(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    

     async findCouponById(couponId:string):Promise<ICoupon|void>{
        try {
            const couponse = await this.couponModels.findById({_id:couponId});
            if(couponse){
                return couponse
            }
           } catch (error) {
            console.error(error)
           }
    }

    async findTop5(): Promise<ICourse[] | void> {
        try {
            const courses = await this.courseModel.find()
            
            if(courses){
                return courses.sort((a,b)=>b.students!.length - a.students!.length).slice(0,5);
            }
           } catch (error) {
            console.error(error)
           }
    }
   
   
} 