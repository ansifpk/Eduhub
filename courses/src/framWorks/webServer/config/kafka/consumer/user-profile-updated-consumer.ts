
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserProfileUpdatedEvent } from "../events/user-profile-updated-event";
import { UserModel } from "../../../../db/mongodb/models/userModel";



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