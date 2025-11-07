import express from 'express'
import { createRatingController, deleteRatingController, getInstructorCoursesController, getratingsController, getReportsController, placeOrderController, purchasedCoursesController, testSubmitController, updateRatingContoller, userCouponDetailesController, userCourseDatailesController, userCreateReportController, userGetCouponsController, userGetCoursesController, userGetTestController } from '../../insfrastructure/di/DiContainer';
import { isAuth } from '../midllewares/auth';
const router = express.Router();

router.get('/courses',(req,res,next)=>userGetCoursesController.handle(req,res,next))
router.get("/getCourses/:instructorId",isAuth,(req,res,next)=>getInstructorCoursesController.handle(req,res,next))
router.get("/courseDetailes/:courseId",(req,res,next)=>userCourseDatailesController.handle(req,res,next))
router.get("/puchasedCourses/:userId",isAuth,(req,res,next)=>purchasedCoursesController.handle(req,res,next))
router.route("/test/:testId")
    .all(isAuth)
    .get((req,res,next)=>userGetTestController.handle(req,res,next))
    .patch((req,res,next)=>testSubmitController.handle(req,res,next))
router.post("/create-checkout-session",isAuth,(req,res,next)=>placeOrderController.handle(req,res,next))
router.get("/rating/:courseId",isAuth,(req,res,next)=>getratingsController.handle(req,res,next))
router.post("/rating",isAuth,(req,res,next)=>createRatingController.handle(req,res,next))
router.patch("/rating/:_id",isAuth,(req,res,next)=>updateRatingContoller.handle(req,res,next))
router.delete("/rating/:ratingId",isAuth,(req,res,next)=>deleteRatingController.handle(req,res,next))
router.get("/coupons",isAuth,(req,res,next)=>userGetCouponsController.handle(req,res,next))
router.get("/coupons/:couponCode/:userId",isAuth,(req,res,next)=>userCouponDetailesController.handle(req,res,next))
router.post("/report/:userId",isAuth,(req,res,next)=>userCreateReportController.handle(req,res,next))
router.get("/report/:userId/:courseId",isAuth,(req,res,next)=>getReportsController.handle(req,res,next))

export {router as userRoute}