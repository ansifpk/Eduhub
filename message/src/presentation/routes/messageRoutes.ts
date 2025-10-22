
import express from "express";
import { GetMessagesController } from "../controllers/getMessagesController";
import { GetMessages } from "../../application/useCase/GetMessages";
import { UserRepository } from "../../infrastructure/db/repositories/userRepository";
import { messageModel } from "../../infrastructure/db/modals/messageModel";
import { notificationModel } from "../../infrastructure/db/modals/notificationModel";
import { chatModel } from "../../infrastructure/db/modals/chat";
import { userModel } from "../../infrastructure/db/modals/userModel";
import { CreateMessage } from "../../application/useCase/createMessage";
import { CreateMessageController } from "../controllers/creteatMessageController";

const router = express.Router();

const userRepository = new UserRepository(userModel,chatModel,messageModel,notificationModel);
const getMessagesUseCase = new GetMessages(userRepository);
const getMessagesController = new GetMessagesController(getMessagesUseCase);
const createMessagesUseCase = new CreateMessage(userRepository);
const createMessageController = new CreateMessageController(createMessagesUseCase);

router.get('/:chatId',(req,res,next)=>getMessagesController.handle(req,res,next));
router.post('/',(req,res,next)=>createMessageController.handle(req,res,next));
export {router as messageRouter};