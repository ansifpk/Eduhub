import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCases/IadminUseCase";


export class AdminController{
    constructor(private adminUseCase:IAdminUseCase){}


    //coupons

    async getCoupons(req:Request,res:Response,next:NextFunction){
        try {
        
         const coupon = await this.adminUseCase.getCoupons(next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
        } catch (error) {
            console.error(error)
        }
    }
    async editCoupons(req:Request,res:Response,next:NextFunction){
        try {
      
        const {couponId} = req.params;
        const {title,description,offer,date,couponCode} = req.body;
         const coupon = await this.adminUseCase.editCoupon(couponId,title,description,offer,date,couponCode,next)
         if(coupon){
            return res.send({success:true,coupon:coupon})
         }
        } catch (error) {
            console.error(error)
        }
    }
    async createCoupons(req:Request,res:Response,next:NextFunction){
        try {
            const {title,description,offer,date,couponCode} = req.body;
            console.log(offer);
            
         const coupon = await this.adminUseCase.createCoupon(title,description,offer,date,couponCode,next)
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
        
        const courses = await this.adminUseCase.fetchCourses();
        return res.send(courses)
    }
    
}