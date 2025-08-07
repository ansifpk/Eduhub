import { NextFunction } from "express"
import { IChat } from "../../entities/chat"
import { IUserRepository } from "../interfaces/repositoryInterfaces/IUserRepository"
import { IUserUseCase } from "../interfaces/useCasesInterfaces/IuserUseCas"
import { IMessage } from "../../entities/message"
import { INotification } from "../../entities/notifications"
import { UpdateWriteOpResult } from "mongoose"
import {  BadRequestError, ForbiddenError, NotFoundError, StatusCodes } from "@eduhublearning/common"

export class UseruseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}

    async markAsRead(userId: string, senterId: string, next: NextFunction): Promise<UpdateWriteOpResult | void> {
        const user  = await this.userRepository.findUserById(senterId);

        if(!user){
          throw new   NotFoundError("User Not Found")
        
        }
        const notifications = await this.userRepository.updateNotification(userId,senterId);
        if(notifications){
           return  notifications
        }
    }
   async  getNotifications(recipientId: string, next: NextFunction): Promise<INotification[] | void> {
    try {
        const user  = await this.userRepository.findUserById(recipientId);

        if(!user){
            throw new NotFoundError("User Not Found")
        }
        const notifications = await this.userRepository.findAllNotification(recipientId);
        if(notifications){
           return  notifications
        }
     } catch (error) {
         console.error(error)
         next(error)
     }
    }
    async createNotifications(recipientId: string, senderId: string, next: NextFunction): Promise<INotification | void> {
        try {
            const user  = await this.userRepository.findUserById(recipientId);
            if(!user){
               throw new   NotFoundError("User Not Found")
            }
            const user2  = await this.userRepository.findUserById(senderId);
            if(!user2){
               throw new NotFoundError("User Not Found")
            }
            const notifications = await this.userRepository.createNotification(recipientId,senderId);
            if(notifications){
               return  notifications
            }
         } catch (error) {
             console.error(error)
             next(error)
         }
    }
 
    async createChat(userId: string, recipientId: string,role:string,next:NextFunction): Promise<IChat | void> {
        try {
           const checkCurrentUser = await this.userRepository.findUserById(userId)
           const checkRecipientUser = await this.userRepository.findUserById(recipientId)
           if(!checkCurrentUser || !checkRecipientUser){
               throw new   NotFoundError("User Not Found")
           }

           if(checkRecipientUser.isBlock){
             throw new  BadRequestError("This user is blocked")
           }
           const checkChatExists = await this.userRepository.findChat(userId,recipientId);
           if(checkChatExists){
            return checkChatExists;
           }

           const chat = await this.userRepository.create(userId,recipientId,role)
           if(chat){
            const newChat = await this.userRepository.findChat(userId,recipientId);
            return newChat;
           }

        } catch (error) {
            console.error(error)
            next(error)
        }
    }
    async fetchChats(userId: string,next:NextFunction): Promise<IChat[] | void> {
        try {
           const user  = await this.userRepository.findUserById(userId);
           const userChats = await this.userRepository.find(userId)
           if(!user){
              throw new NotFoundError("User Not Found")
           }
           if(userChats){
            return userChats;
           }
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
    async privetChat(chatId:string,next:NextFunction): Promise<IChat | void> {
        try {
     
           const chat = await this.userRepository.findChatById(chatId);
         
           if(!chat){

            throw new NotFoundError("Chat Not Found")
           }
           if(chat.members[1].isBlock){
            throw new  BadRequestError("This user is blocked")
           }
           return chat;
    
        } catch (error) {
            console.error(error)
            next(error)
        }
    }

    //? message

    async fetchMessages(chatId: string): Promise<IMessage[] | void> {
        try {
           const messages = await this.userRepository.findAllMessages(chatId);  
           if(messages){
            return messages
           }
        } catch (error) {
            console.error(error)
        }
    }
    async insertMessage(chatId:string,senderId:string,text:string,next:NextFunction): Promise<IMessage | void> {
        try {
      
            const checkChat = await this.userRepository.findChatById(chatId);
            if(!checkChat){
                throw new NotFoundError("Chat Not Found")
            }
            if(checkChat.members[1].isBlock){
                throw new  BadRequestError("This user is blocked");
            }
            
            const checkUser = await this.userRepository.findUserById(senderId);
            
            if(!checkUser){
                  throw new   NotFoundError("User Not Found")
            }
            if(checkUser.isBlock){
               throw new  ForbiddenError()
            }
            
            const message = await this.userRepository.createMessage(chatId,senderId,text)
            if(message){
                return message
            }
            
        } catch (error) {
            console.error(error)
        }
    }

}
  