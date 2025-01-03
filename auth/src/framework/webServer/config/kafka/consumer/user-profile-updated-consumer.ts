
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import { UserProfileUpdatedEvent } from "../events/user-profile-updated-event";



export class UserProfileUpdatedConsumer extends KafkaConsumer<UserProfileUpdatedEvent>{
    
    topic: Topics.profileUpdated = Topics.profileUpdated;
    groupId: string = "auth-profile-updated-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; name: string}): Promise<void> {
       try {
         await userModel.findOneAndUpdate({_id:data._id},{$set:{name:data.name}},{new:true});
       } catch (error) {
        console.error(error)
       }
    }
}