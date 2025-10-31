
import { Consumer } from "kafkajs";
import { Topics,EmailChangedEvent,KafkaConsumer } from "@eduhublearning/common";
import { UserModel } from "../../db/models/userModel";



export class EmailChangedConsumer extends KafkaConsumer<EmailChangedEvent>{
    
    topic: Topics.emailChanged = Topics.emailChanged;
    groupId: string = "course-email-changed-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    
    async onMessage(data: { _id: string; email: string; }): Promise<void> {
        try {
           await UserModel.findByIdAndUpdate({_id:data._id},{$set:{email:data.email}},{new:true})
        } catch (error) {
            console.error(error)
        }
    }
}