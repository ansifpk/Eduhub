import { ICoupon } from "../../../entities/coupon";
import { ICourse } from "../../../entities/course";
import { IAdminRepository } from "../../../useCases/interfaces/repository/IAdminRepository";
import { couponModel } from "../mongodb/models/couponsModel";
import { Course } from "../mongodb/models/courseModel";

export class AdminRepository implements IAdminRepository{
    constructor(
        private courseModel:typeof Course,
        private couponModels:typeof couponModel,

    ){}
    async createCoupon(title:string,description:string,offer:number,date:Date,couponCode:string):Promise<ICoupon|void>{
        try {
            const coupon = await this.couponModels.create({
               title:title,
               expiryDate:date,
               offer:offer,
              description:description,
              couponCode:couponCode

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
   async editCoupon(couponId: string, title: string, description: string, offer: number, date: Date, couponCode: string): Promise<ICoupon | void> {
    try {
        const couponse = await this.couponModels.findByIdAndUpdate({_id:couponId},{$set:{title:title,description:description,offer:offer,expiryDate:date,couponCode:couponCode}},{new:true});
        if(couponse){
            return couponse
        }
       } catch (error) {
        console.error(error)
       }
    }
    async coupons(): Promise<ICoupon[] | void> {
       try {
        const couponse = await this.couponModels.find();
        if(couponse){
            return couponse
        }
     
   
       } catch (error) {
        console.error(error)
       }
    }
    async find(): Promise<ICourse[]> {
       const courses =  await this.courseModel.find();
       return courses
    }
    create(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    list(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    edit(courseData: ICourse): Promise<ICourse | void> {
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
   
   
} 