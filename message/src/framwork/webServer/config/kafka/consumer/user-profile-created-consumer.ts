
import { Consumer, Producer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserProfileCreatedEvent } from "../events/user-profile-created-event";
import { userModel } from "../../../../db/mongodb/models/userModel";



export class UserProfileCreatedConsumer extends KafkaConsumer<UserProfileCreatedEvent>{
    topic: Topics.profileCreated = Topics.profileCreated;
    groupId: string = 'message-user-profile-created-group';
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; }): Promise<void> {
        try {
            console.log('Consumer received message user from auth service :', data);
            // Adding userDta to db in course Service
            await userModel.create(data);
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}