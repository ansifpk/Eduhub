
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";

import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongoDB/models/userMode";
import { UserProfileCreateEvent } from "../events/user-profile-created-event";



export class UserProfileCreatedConsumer extends KafkaConsumer<UserProfileCreateEvent>{

    topic: Topics.profileUpdated = Topics.profileUpdated;
    groupId: string = "purchase-user-profile-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean;isAdmin:boolean; isBlock: boolean; createdAt: Date; avatar: { id: string; avatar_url: string; }; }): Promise<void> {
        try {
            console.log('Consumer received message user :', data);
            // Adding userDta to db in order Service
            await UserModel.create(data)
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}