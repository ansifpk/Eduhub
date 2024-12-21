import { Router } from "express";
import { adminController } from "./injectionss/injections";
import { isAdmin } from "../midllewares/isAuth";

export function AdminRouter(router:Router){
     router.get("/getCourses",isAdmin,(req,res,nex)=>{
        adminController.getCourses(req,res,nex)
     })
     router.get("/coupon",isAdmin,(req,res,nex)=>{
        adminController.getCoupons(req,res,nex)
     })
     router.get("/coupon:/couponId",isAdmin,(req,res,nex)=>{
        adminController.couponDetailes(req,res,nex)
     })
     router.post("/coupon",isAdmin,(req,res,nex)=>{
     
      
        adminController.createCoupons(req,res,nex)
     })
     router.patch("/coupon/:couponId",isAdmin,(req,res,nex)=>{
        adminController.editCoupons(req,res,nex)
     })
     router.delete("/coupon/:couponId",isAdmin,(req,res,nex)=>{
        adminController.deleteCoupons(req,res,nex)
     })
}