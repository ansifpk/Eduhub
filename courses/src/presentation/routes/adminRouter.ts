import express from 'express';
import { isAdmin } from '../midllewares/auth';
import { couponCreateController, couponDetailesController, deleteCouponController, deleteLectureController, editCouponController, getCouponsController, getCoursesController, reportController, top5RatedCoursesController } from '../../insfrastructure/di/DiContainer';
const router = express.Router();

router.get("/getCourses",isAdmin,(req,res,next)=>getCoursesController.handle(req,res,next));
router.get("/course",isAdmin,(req,res,next)=>deleteLectureController.handle(req,res,next));
router.get("/top5Course",isAdmin,(req,res,next)=>top5RatedCoursesController.handle(req,res,next));
router.get("/coupon",isAdmin,(req,res,next)=>getCouponsController.handle(req,res,next));
router.get("/coupon:/couponId",isAdmin,(req,res,next)=>couponDetailesController.handle(req,res,next));
router.post("/coupon",isAdmin,(req,res,next)=>couponCreateController.handle(req,res,next));
router.patch("/coupon/:couponId",isAdmin,(req,res,next)=>editCouponController.handle(req,res,next));
router.delete("/coupon/:couponId",isAdmin,(req,res,next)=>deleteCouponController.handle(req,res,next));
router.get("/report",isAdmin,(req,res,next)=>reportController.handle(req,res,next));

export {router as adminRoute}