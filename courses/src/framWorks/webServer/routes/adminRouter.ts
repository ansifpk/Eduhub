import { Router } from "express";
import { adminController } from "./injectionss/injections";
import { isAdmin } from "../midllewares/isAuth";

export function AdminRouter(router:Router){
     router.get("/getCourses",isAdmin,(req,res,next)=>{
        adminController.getCourses(req,res,next)
     })
     router.get("/course",isAdmin,(req,res,next)=>{
        adminController.top5Courses(req,res,next)
     })
     router.get("/coupon",isAdmin,(req,res,next)=>{
        adminController.getCoupons(req,res,next)
     })
     router.get("/coupon:/couponId",isAdmin,(req,res,next)=>{
        adminController.couponDetailes(req,res,next)
     })
     router.post("/coupon",isAdmin,(req,res,next)=>{
        adminController.createCoupons(req,res,next)
     })
     router.patch("/coupon/:couponId",isAdmin,(req,res,next)=>{
        adminController.editCoupons(req,res,next)
     })
     router.delete("/coupon/:couponId",isAdmin,(req,res,next)=>{
        adminController.deleteCoupons(req,res,next)
     })
     router.get("/report",isAdmin,(req,res,next)=>{
        adminController.getReports(req,res,next)
     })
}