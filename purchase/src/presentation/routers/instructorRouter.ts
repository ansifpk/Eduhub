import expres from 'express';
import { createSubscriptionController, editSubscriptionController, getOrdersController, instructorGetSubscriptionsController, instructorPlansController, instructorsCourseOrdersController, instructorsSubscriptionController, instructorSubscriptionDetailesController, salesReportController, subscriptionPurchaseController } from '../../infrastructure/di/diContaier';
import { isInstructor } from '../middlewares/auth';
const router = expres.Router();
router.get("/subscription",(req,res,next)=>instructorGetSubscriptionsController.handle(req,res,next))
router.get("/subscription/:userId",isInstructor,(req,res,next)=>instructorsSubscriptionController.handle(req,res,next))
router.get("/subscribe/:userId",isInstructor,(req,res,next)=>instructorPlansController.handle(req,res,next))
router.get("/subscribe/:method/:userId",isInstructor,(req,res,next)=>subscriptionPurchaseController.handle(req,res,next))
router.get("/customer/:customerId",isInstructor,(req,res,next)=>instructorSubscriptionDetailesController.handle(req,res,next))
router.post("/subscription/:userId",isInstructor,(req,res,next)=>createSubscriptionController.handle(req,res,next))
router.patch("/subscription/:subscriptionId",isInstructor,(req,res,next)=>editSubscriptionController.handle(req,res,next))
router.get("/order",isInstructor,(req,res,next)=>getOrdersController.handle(req,res,next))
router.get("/order/:instructorId/:start/:end",isInstructor,(req,res,next)=>instructorsCourseOrdersController.handle(req,res,next))
router.get("/salesReports",isInstructor,(req,res,next)=>salesReportController.handle(req,res,next))


export {router as instructorRouter}