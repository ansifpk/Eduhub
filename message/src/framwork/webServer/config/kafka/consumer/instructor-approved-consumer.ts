
import { Consumer } from "kafkajs";
import { userModel } from "../../../../db/mongodb/models/userModel";
import { Topics,KafkaConsumer,InstructorAprovedEvent } from "@eduhublearning/common";


export class InstructorAprovalConsumer extends KafkaConsumer<InstructorAprovedEvent>{
 
    
    topic: Topics.instructorAproved = Topics.instructorAproved;
    groupId: string = "message-instructor-approved-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

    async onMessage(data: { _id: string; isInstructor: boolean; }): Promise<void> {
        try {
            const {_id,isInstructor} = data;
            await userModel.findOneAndUpdate({_id:_id},{$set:{isInstructor:isInstructor}},{new:true})
        } catch (error) {
         console.error(error)
        }
     }

}