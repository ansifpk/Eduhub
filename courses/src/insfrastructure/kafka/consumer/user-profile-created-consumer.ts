
import { Consumer } from "kafkajs";
import { Topics,UserProfileCreatedEvent,KafkaConsumer } from "@eduhublearning/common";
import { UserModel } from "../../db/models/userModel";

export class UserProfileCreateConsumer extends KafkaConsumer<UserProfileCreatedEvent>{
   
 
    topic: Topics.profileCreated = Topics.profileCreated;
    groupId: string = "course-user-profile-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; isBlock: boolean; isAdmin: boolean; createdAt: Date; avatar: { id: string; avatar_url: string; }; }): Promise<void> {
       try {
          await UserModel.create(data)
       } catch (error) {
        console.error(error)
       }
    }
}