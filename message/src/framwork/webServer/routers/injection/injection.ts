import { ChatController } from "../../../../controllers/chatController";
import { MessageController } from "../../../../controllers/messageController";
import { UseruseCase } from "../../../../useCases/useCases/userUseCase";
import { chatModel } from "../../../db/mongodb/models/chat";
import { messageModel } from "../../../db/mongodb/models/messageModel";
import { userModel } from "../../../db/mongodb/models/userModel";
import { UserRepository } from "../../../db/mongodb/repository/userRepository";

const userRepository = new UserRepository(userModel,chatModel,messageModel)
const userUseCase = new UseruseCase(userRepository)
const chatController = new ChatController(userUseCase)
const messageController = new MessageController(userUseCase)

export {chatController,userUseCase,userRepository,messageController}