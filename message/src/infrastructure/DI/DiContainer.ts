import { CreateChatUseCase } from "../../application/useCase/createChat";
import { CreateMessage } from "../../application/useCase/createMessage";
import { CreateNotification } from "../../application/useCase/createNotification";
import { FetchChats } from "../../application/useCase/fetchChats";
import { GetMessages } from "../../application/useCase/GetMessages";
import { GetNotification } from "../../application/useCase/getNotification";
import { GetPrivetChate } from "../../application/useCase/getPrivetChate";
import { MarkAsRead } from "../../application/useCase/markAsRead";
import { CreateChatController } from "../../presentation/controllers/createChatController";
import { CreateNotificationController } from "../../presentation/controllers/createNotificationController";
import { CreateMessageController } from "../../presentation/controllers/creteatMessageController";
import { FindPrivetChatController } from "../../presentation/controllers/findPrivetChatController";
import { FindUserChatsController } from "../../presentation/controllers/findUserChatsController";
import { GetMessagesController } from "../../presentation/controllers/getMessagesController";
import { GetNotificationController } from "../../presentation/controllers/getNotificationController";
import { MarkAsReadController } from "../../presentation/controllers/markAsReadController";
import { chatModel } from "../db/modals/chat";
import { messageModel } from "../db/modals/messageModel";
import { notificationModel } from "../db/modals/notificationModel";
import { userModel } from "../db/modals/userModel";
import { UserRepository } from "../db/repositories/userRepository";

const userRepository = new UserRepository(userModel,chatModel,messageModel,notificationModel);
const createChatUseCase = new CreateChatUseCase(userRepository);
const fetchChatsUseCase = new FetchChats(userRepository);
const getMessagesUseCase = new GetMessages(userRepository);
const createMessagesUseCase = new CreateMessage(userRepository);
const getPrivetChateUseCase = new GetPrivetChate(userRepository);
const getNotification = new GetNotification(userRepository)
const createNotificationUseCase = new CreateNotification(userRepository)
const markAsReadUseCase = new MarkAsRead(userRepository)

const createChatController = new CreateChatController(createChatUseCase);
const findUserChatsController = new FindUserChatsController(fetchChatsUseCase);
const findPrivetChatController = new FindPrivetChatController(getPrivetChateUseCase);
const getMessagesController = new GetMessagesController(getMessagesUseCase);
const createMessageController = new CreateMessageController(createMessagesUseCase);
const getNotificationController = new GetNotificationController(getNotification)
const createNotificationController = new CreateNotificationController(createNotificationUseCase)
const markAsReadController = new MarkAsReadController(markAsReadUseCase)

export {createChatController,findUserChatsController,findPrivetChatController,getMessagesController,createMessageController,getNotificationController,createNotificationController,markAsReadController}