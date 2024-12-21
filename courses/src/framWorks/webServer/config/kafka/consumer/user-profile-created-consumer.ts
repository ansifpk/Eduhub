
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongodb/models/userModel";
import { UserProfileCreatedEvent } from "../events/user-profile-created-event";


export class UserProfileCreateConsumer extends KafkaConsumer<UserProfileCreatedEvent>{
   
 
    topic: Topics.profileCreated = Topics.profileCreated;
    groupId: string = "course-user-profile-created-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; isBlock: boolean; isAdmin: boolean; createdAt: Date; avatar: { id: string; avatar_url: string; }; }): Promise<void> {
       try {
          console.log("data from profile serv",data);
          
          await UserModel.create(data)
       } catch (error) {
        console.error(error)
       }
    }
}