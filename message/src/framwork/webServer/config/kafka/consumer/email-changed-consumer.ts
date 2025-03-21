
import { Consumer } from "kafkajs";
import { userModel } from "../../../../db/mongodb/models/userModel";
import { Topics,KafkaConsumer,EmailChangedEvent } from "@eduhublearning/common";



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