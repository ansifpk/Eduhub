
import { Consumer } from "kafkajs";
import { Topics,KafkaConsumer,EmailChangedEvent } from "@eduhublearning/common";
import { userModel } from "../../db/modals/userModel";



export class EmailChangedConsumer extends KafkaConsumer<EmailChangedEvent>{
    
    topic: Topics.emailChanged = Topics.emailChanged;
    groupId: string = "message-email-changed-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async onMessage(data: { _id: string; email: string; }): Promise<void> {
        try {
           await userModel.findByIdAndUpdate({_id:data._id},{$set:{email:data.email}})
        } catch (error) {
            console.error(error)
        }
    }
}