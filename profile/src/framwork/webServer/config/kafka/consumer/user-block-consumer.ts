
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import { UserBlockedEvent } from "../events/user-block-event";


export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "profile-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { email: string; isBlock: boolean; }): Promise<void> {
        try {

           const {email,isBlock} = data
           await userModel.findOneAndUpdate({email:email},{$set:{isBlock:isBlock}},{new:true})
        } catch (error) {
            
        }
    }

    
}