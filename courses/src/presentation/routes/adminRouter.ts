import express from 'express';
import { isAdmin } from '../midllewares/auth';
import { couponCreateController, couponDetailesController, deleteCouponController, deleteLectureController, editCouponController, getCouponsController, getCoursesController, reportController, top5RatedCoursesController } from '../../insfrastructure/di/DiContainer';
const router = express.Router();

router.get("/getCourses",isAdmin,(req,res,next)=>getCoursesController.handle(req,res,next));
router.get("/course",isAdmin,(req,res,next)=>deleteLectureController.handle(req,res,next));
router.get("/top5Course",isAdmin,(req,res,next)=>top5RatedCoursesController.handle(req,res,next))
router.route("/coupon")
    .all(isAdmin)
    .get((req,res,next)=>getCouponsController.handle(req,res,next))
    .post((req,res,next)=>couponCreateController.handle(req,res,next));
router.route("/coupon/:couponId")
    .all(isAdmin)
    .get((req,res,next)=>couponDetailesController.handle(req,res,next))
    .patch((req,res,next)=>editCouponController.handle(req,res,next))
    .delete((req,res,next)=>deleteCouponController.handle(req,res,next));
router.get("/report",isAdmin,(req,res,next)=>reportController.handle(req,res,next));

export {router as adminRoute}