
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import { UserUpdatedEvent } from "../events/user-updated-event";



export class UserUpdatedConsumer extends KafkaConsumer<UserUpdatedEvent>{
    
    
    topic: Topics.userUpdated = Topics.userUpdated;
    groupId: string = "auth-user-updated-group";
   
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