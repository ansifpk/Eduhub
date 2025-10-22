
import { Consumer } from "kafkajs";
import { Topics,KafkaConsumer,InstructorAprovedEvent } from "@eduhublearning/common";
import { userModel } from "../../db/modals/userModel";


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