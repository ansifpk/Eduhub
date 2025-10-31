
import { Consumer } from "kafkajs";
import { KafkaConsumer, Topics ,EmailChangedEvent} from "@eduhublearning/common";
import { userModel } from "../../db/models/userModel";



export class EmailChangedConsumer extends KafkaConsumer<EmailChangedEvent>{
    
    topic: Topics.emailChanged = Topics.emailChanged;
    groupId: string = "profile-email-changed-group";
   
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