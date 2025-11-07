import express from 'express';
import { adminChartController, adminCreateSubscriptionController, adminEditSubscriptionController, adminGetOrdersController, adminSalesRepostController, getAdminSubscriptionsController } from '../../infrastructure/di/diContaier';
import { isAdmin } from '../middlewares/auth';
const router = express.Router();

router.route("/subscription")
.all(isAdmin)
.get((req,res,next)=>getAdminSubscriptionsController.handle(req,res,next))
.post((req,res,next)=>adminCreateSubscriptionController.handle(req,res,next))
router.patch("/subscription/:subscriptionId",isAdmin,(req,res,next)=>adminEditSubscriptionController.handle(req,res,next));
router.get("/salesReports",isAdmin,(req,res,next)=>adminSalesRepostController.handle(req,res,next));
router.get("/order",isAdmin,(req,res,next)=>adminGetOrdersController.handle(req,res,next));
router.get("/getOrders/:start/:end",isAdmin,(req,res,next)=>adminChartController.handle(req,res,next));

export {router as adminRouter}

