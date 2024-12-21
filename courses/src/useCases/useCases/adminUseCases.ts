import { NextFunction } from "express";
import { ICoupon } from "../../entities/coupon";
import { ICourse } from "../../entities/course";
import { IAdminRepository } from "../interfaces/repository/IAdminRepository";
import { IAdminUseCase } from "../interfaces/useCases/IadminUseCase";
import ErrorHandler from "../middlewares/errorHandler";

export class AdminUseCase implements IAdminUseCase{
    constructor(private adminRepository:IAdminRepository,){}
    async createCoupon(title: string, description: string, offer: number, date: Date, couponCode: string, next: NextFunction): Promise<ICoupon | void> {
       try {
        const coupon = await this.adminRepository.createCoupon(title,description,offer,date,couponCode);
        if(coupon){
            return coupon
        }
       } catch (error) {
        console.error(error)
       }

    }
    async editCoupon(couponId: string, title: string, description: string, offer: number, date: Date, couponCode: string, next: NextFunction): Promise<ICoupon | void> {
        try {
            const couponCheck = await this.adminRepository.findCouponById(couponId);

            if(!couponCheck){
                return next(new ErrorHandler(400,"Coupon Not found"))
            }
                
            const coupon = await this.adminRepository.editCoupon(couponId,title,description,offer,date,couponCode);
          
            if(coupon){
                return coupon
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
    async fetchCourses(): Promise<ICourse[]> {
       const courses = await this.adminRepository.find()
       return courses
    }
    createCourse(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    editCourse(courseData: ICourse): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    listCourse(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    
} 