

import  express, { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { userModel } from "../../infrastructure/db/modals/userModel";
import { chatModel } from "../../infrastructure/db/modals/chat";
import { messageModel } from "../../infrastructure/db/modals/messageModel";
import { notificationModel } from "../../infrastructure/db/modals/notificationModel";
import { GetNotificationController } from "../controllers/getNotificationController";
import { GetNotification } from "../../application/useCase/getNotification";
import { CreateNotification } from "../../application/useCase/createNotification";
import { CreateNotificationController } from "../controllers/createNotificationController";
import { MarkAsRead } from "../../application/useCase/markAsRead";
import { MarkAsReadController } from "../controllers/markAsReadController";

const router = express.Router();
const userRepository = new UserRepository(userModel,chatModel,messageModel,notificationModel);
const getNotification = new GetNotification(userRepository)
const getNotificationController = new GetNotificationController(getNotification)
const createNotificationUseCase = new CreateNotification(userRepository)
const createNotificationController = new CreateNotificationController(createNotificationUseCase)
const markAsReadUseCase = new MarkAsRead(userRepository)
const markAsReadController = new MarkAsReadController(markAsReadUseCase)

router.get('/:recipientId',(req:Request,res:Response,next:NextFunction)=>getNotificationController.handle(req,res,next))
router.post('/',(req:Request,res:Response,next:NextFunction)=>createNotificationController.handle(req,res,next))
router.patch('/:userId/:senderId',(req:Request,res:Response,next:NextFunction)=>markAsReadController.handle(req,res,next));

export {router as notificationRouter}