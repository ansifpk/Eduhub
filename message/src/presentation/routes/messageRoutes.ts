
import express from "express";
import { createMessageController, getMessagesController } from "../../infrastructure/DI/DiContainer";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.get('/:chatId',isAuth,(req,res,next)=>getMessagesController.handle(req,res,next));
router.post('/',isAuth,(req,res,next)=>createMessageController.handle(req,res,next));
export {router as messageRouter};