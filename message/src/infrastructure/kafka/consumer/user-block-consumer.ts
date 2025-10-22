
import { Consumer } from "kafkajs";
import { Topics,KafkaConsumer,UserBlockedEvent } from "@eduhublearning/common";
import { userModel } from "../../db/modals/userModel";


export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "message-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { _id: string; isBlock: boolean; }): Promise<void> {
        try {

           const {_id,isBlock} = data
           await userModel.findByIdAndUpdate({_id:_id},{$set:{isBlock:isBlock}},{new:true})
        } catch (error) {
            console.error(error)
        }
    }
}