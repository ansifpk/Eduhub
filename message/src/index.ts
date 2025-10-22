import dotenv from 'dotenv';
import { CreateChatController } from './presentation/controllers/createChatController';
import { ApiServer } from './presentation/ApiServer';
import { CreateChatUseCase } from './application/useCase/createChat';
import { UserRepository } from './infrastructure/db/repositories/userRepository';
import { FindUserChatsController } from './presentation/controllers/findUserChatsController';
import { FetchChats } from './application/useCase/fetchChats';
import { userModel } from './infrastructure/db/modals/userModel';
import { chatModel } from './infrastructure/db/modals/chat';
import { messageModel } from './infrastructure/db/modals/messageModel';
import { notificationModel } from './infrastructure/db/modals/notificationModel';
import { FindPrivetChatController } from './presentation/controllers/findPrivetChatController';
import { GetPrivetChate } from './application/useCase/getPrivetChate';
dotenv.config();

async function main(){
  
  
  await ApiServer.run(Number(process.env.PORT)!);

}
main();