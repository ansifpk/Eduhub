

import  express, { NextFunction, Request, Response } from "express";
import { createNotificationController, getNotificationController, markAsReadController } from "../../infrastructure/DI/DiContainer";
import { isAuth } from "../middlewares/auth";

const router = express.Router();


router.get('/:recipientId',isAuth,(req:Request,res:Response,next:NextFunction)=>getNotificationController.handle(req,res,next))
router.post('/',isAuth,(req:Request,res:Response,next:NextFunction)=>createNotificationController.handle(req,res,next))
router.patch('/:userId/:senderId',isAuth,(req:Request,res:Response,next:NextFunction)=>markAsReadController.handle(req,res,next));

export {router as notificationRouter}