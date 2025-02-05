
import { Consumer } from "kafkajs";
import { Topics,InstructorAprovedEvent,KafkaConsumer } from "@eduhublearning/common";
import { UserModel } from "../../../../db/mongodb/models/userModel";






export class InstructorAprovedConsumer extends KafkaConsumer<InstructorAprovedEvent>{
   
    
    
    topic: Topics.instructorAproved = Topics.instructorAproved;
    groupId: string = "course-instructor-approved-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
   async   onMessage(data: { _id: string; isInstructor: boolean; }): Promise<void> {
       try {
          const {_id,isInstructor} = data
          await UserModel.findByIdAndUpdate({_id:_id},{isInstructor:isInstructor},{new:true})
       } catch (error) {
        console.error(error)
       }
    }
    
}