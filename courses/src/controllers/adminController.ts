import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCases/IadminUseCase";


export class AdminController{
    constructor(private adminUseCase:IAdminUseCase){}


    //coupons

    async getCoupons(req:Request,res:Response,next:NextFunction){
        try {
         const {search,sort,page} = req.query;
                 
         const coupon = await this.adminUseCase.getCoupons(search as string,sort as string,page as string,next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
        } catch (error) {
            console.error(error)
        }
    }
    async getReports(req:Request,res:Response,next:NextFunction){
        try {
        
         const reports = await this.adminUseCase.getReports()
         if(reports){
            return res.send(reports)
         }
        } catch (error) {
            console.error(error)
        }
    }
    async editCoupons(req:Request,res:Response,next:NextFunction){
        try {
      
        const {couponId} = req.params;
       
        const {title,description,offer,startingDate,expiryDate,couponCode} = req.body;
        
    
         const coupon = await this.adminUseCase.editCoupon(couponId,title,description,offer,startingDate,expiryDate,couponCode,next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
        } catch (error) {
            console.error(error)
        }
    }
    async createCoupons(req:Request,res:Response,next:NextFunction){
        try {
            const {title,description,offer,startingDate,expiryDate,couponCode} = req.body;
            console.log(req.body);
            
         const coupon = await this.adminUseCase.createCoupon(title,description,offer,startingDate,expiryDate,couponCode,next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
        } catch (error) {
            console.error(error)
        }
    }     
    async deleteCoupons(req:Request,res:Response,next:NextFunction){
        try {
             const {couponId} = req.params;
             const coupon = await this.adminUseCase.deleteCoupon(couponId,next)
             if(coupon){
                return res.send({success:true,coupon:coupon})
             }
            } catch (error) {
                console.error(error)
            }
    }

    async couponDetailes(req:Request,res:Response,next:NextFunction){
       try {
         const {couponId} = req.params;
         const coupon = await this.adminUseCase.couponDetailes(couponId,next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
       } catch (error) {
        console.error(error)
       }
    }
    
    // courses
    async getCourses(req:Request,res:Response,next:NextFunction){
        
        try {
            const {search,sort,page} = req.query;
            const courses = await this.adminUseCase.fetchCourses(search as string,sort as string,parseInt(page as string));
            if(courses){
                return res.send({courses:courses.courses,pages:courses.pages})
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    async top5Courses(req:Request,res:Response,next:NextFunction){
        try {
            
            const courses = await this.adminUseCase.top5Courses(next);
            if(courses){
                return res.send(courses)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async top5RatedCourses(req:Request,res:Response,next:NextFunction){
        
        try {
            const courses = await this.adminUseCase.top5RatedCourses(next);
            if(courses){
                return res.send(courses)
            }
        } catch (error) {
            console.error(error)
        }
    }
    async deletLecture(req:Request,res:Response,next:NextFunction){
        
        try {
            const {lectureUrl} = req.body
            const courses = await this.adminUseCase.deletLecture(lectureUrl,next);
            if(courses){
                return res.send({success:true})
            }
        } catch (error) {
            console.error(error)
        }
    }
    
}