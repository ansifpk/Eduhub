
import { Consumer } from "kafkajs";
import { KafkaConsumer, Topics ,UserProfileUpdatedEvent} from "@eduhublearning/common";
import { UserModel } from "../../db/models/userMode";



export class UserProfileUpdatedConsumer extends KafkaConsumer<UserProfileUpdatedEvent>{
    
    topic: Topics.profileUpdated = Topics.profileUpdated;
    groupId: string = "purchase-profile-updated-group";
   
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