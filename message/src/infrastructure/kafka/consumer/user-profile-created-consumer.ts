
import { Consumer, Producer } from "kafkajs";
import { Topics,KafkaConsumer,UserProfileCreatedEvent } from "@eduhublearning/common";
import { userModel } from "../../db/modals/userModel";



export class UserProfileCreatedConsumer extends KafkaConsumer<UserProfileCreatedEvent>{
    topic: Topics.profileCreated = Topics.profileCreated;
    groupId: string = 'message-user-profile-created-group';
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; }): Promise<void> {
        try {
            // Adding userDta to db in course Service
            await userModel.create(data);
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}