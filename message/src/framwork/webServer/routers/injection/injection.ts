import { ChatController } from "../../../../controllers/chatController";
import { MessageController } from "../../../../controllers/messageController";
import { chatModel } from "../../../db/mongodb/models/chat";
import { userModel } from "../../../db/mongodb/models/userModel";


const chatController = new ChatController()
const messageController = new MessageController()
export {chatController,messageController}