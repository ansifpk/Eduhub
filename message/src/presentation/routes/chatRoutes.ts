import express from "express";
import { createChatController, findPrivetChatController, findUserChatsController } from "../../infrastructure/DI/DiContainer";
import { isAuth } from "../middlewares/auth";


const router = express.Router()
router.post('/',isAuth,(req,res,next)=>createChatController.handle(req,res,next));
router.get('/',isAuth,(req,res,next)=>findUserChatsController.handle(req,res,next));
router.get('/privetChat/:chatId',isAuth,(req,res,next)=>findPrivetChatController.handle(req,res,next));
export {router as charRouter};