import express from "express";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { CreateChatUseCase } from "../../application/useCase/createChat";
import { FetchChats } from "../../application/useCase/fetchChats";
import { GetPrivetChate } from "../../application/useCase/getPrivetChate";
import { CreateChatController } from "../controllers/createChatController";
import { FindUserChatsController } from "../controllers/findUserChatsController";
import { FindPrivetChatController } from "../controllers/findPrivetChatController";
import { userModel } from "../../infrastructure/db/modals/userModel";
import { chatModel } from "../../infrastructure/db/modals/chat";
import { messageModel } from "../../infrastructure/db/modals/messageModel";
import { notificationModel } from "../../infrastructure/db/modals/notificationModel";

const userRepository = new UserRepository(userModel,chatModel,messageModel,notificationModel);
const createChatUseCase = new CreateChatUseCase(userRepository);
const fetchChatsUseCase = new FetchChats(userRepository);
const getPrivetChateUseCase = new GetPrivetChate(userRepository);
const createChatController = new CreateChatController(createChatUseCase);
const findUserChatsController = new FindUserChatsController(fetchChatsUseCase);
const findPrivetChatController = new FindPrivetChatController(getPrivetChateUseCase);

const router = express.Router()
router.post('/',(req,res,next)=>createChatController.handle(req,res,next));
router.get('/',(req,res,next)=>findUserChatsController.handle(req,res,next));
router.get('/privetChat/:chatId',(req,res,next)=>findPrivetChatController.handle(req,res,next));
export {router as charRouter};