
import { Consumer } from "kafkajs";
import { userModel } from "../../db/models/userModel";
import { Topics,KafkaConsumer, UserBlockedEvent } from "@eduhublearning/common";

export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "profile-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { _id: string; isBlock: boolean; }): Promise<void> {
        try {

           const {_id,isBlock} = data
           await userModel.findByIdAndUpdate({_id:_id},{$set:{isBlock:isBlock}},{new:true})
        } catch (error) {
            
        }
    }

    
}