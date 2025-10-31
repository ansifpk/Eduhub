import express from "express";
import { isAuth } from "../middlewares/auth";
import { getSubscriptionsController, purchasedSubscriptionsController, purchaseSubscriptionController, subscriptionDetailesController } from "../../infrastructure/di/diContaier";
const router = express.Router();

router.get("/subscription/:instructorId",isAuth,(req,res,next)=>getSubscriptionsController.handle(req,res,next));
router.post("/subscription/:subscriptionId",isAuth,(req,res,next)=>purchaseSubscriptionController.handle(req,res,next));
router.get("/subscribe/:userId",isAuth,(req,res,next)=>purchasedSubscriptionsController.handle(req,res,next));
router.get("/customer/:customerId",isAuth,(req,res,next)=>subscriptionDetailesController.handle(req,res,next));

export {router as userRouter}