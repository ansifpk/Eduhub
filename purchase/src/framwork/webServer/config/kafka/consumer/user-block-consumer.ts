
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongoDB/models/userMode";
import { UserBlockedEvent } from "../events/user-block-event";


export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "purchase-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { email: string; isBlock: boolean; }): Promise<void> {
        try {
            const { email,isBlock} = data;
           await UserModel.findOneAndUpdate({email:email},{$set:{isBlock:isBlock}})
        } catch (error) {
            
        }
    }

    
}