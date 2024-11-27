
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { UserCreateEvent } from "../events/user-created-event";
import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongodb/models/userModel";


export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent>{
    topic: Topics.userCreated = Topics.userCreated;
    groupId: string = "course-user-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; }): Promise<void> {
        try {
            console.log('Consumer received message:', data);
            // Adding userDta to db in course Service
            await UserModel.create(data)
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}