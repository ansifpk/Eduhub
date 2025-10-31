
import { Consumer } from "kafkajs";
import { Topics,UserProfileUpdatedEvent,KafkaConsumer } from "@eduhublearning/common";
import { UserModel } from "../../db/models/userModel";

export class UserProfileUpdatedConsumer extends KafkaConsumer<UserProfileUpdatedEvent>{
    
    topic: Topics.profileUpdated = Topics.profileUpdated;
    groupId: string = "course-profile-updated-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; name: string}): Promise<void> {
       try {
         await UserModel.findOneAndUpdate({_id:data._id},{$set:{name:data.name}},{new:true});
       } catch (error) {
        console.error(error)
       }
    }
}