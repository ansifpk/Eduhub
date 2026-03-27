import express from "express";
import { createChatController, findPrivetChatController, findUserChatsController } from "../../infrastructure/DI/DiContainer";
import { isAuth } from "../middlewares/auth";


const router = express.Router()
router.route("/")
    .all(isAuth)
    .get((req,res,next)=>findUserChatsController.handle(req,res,next))
    .post((req,res,next)=>createChatController.handle(req,res,next));
router.get('/privetChat/:chatId',isAuth,(req,res,next)=>findPrivetChatController.handle(req,res,next));
export {router as charRouter};