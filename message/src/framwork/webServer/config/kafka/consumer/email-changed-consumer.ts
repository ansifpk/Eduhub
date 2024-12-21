
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";

import { EmailChangedEvent } from "../events/email-changed-event";
import { userModel } from "../../../../db/mongodb/models/userModel";



export class EmailChangedConsumer extends KafkaConsumer<EmailChangedEvent>{
    
    topic: Topics.emailChanged = Topics.emailChanged;
    groupId: string = "message-email-changed-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async onMessage(data: { _id: string; email: string; }): Promise<void> {
        try {
           await userModel.findByIdAndUpdate({_id:data._id},{$set:{email:data.email}},{new:true})
        } catch (error) {
            console.error(error)
        }
    }
}