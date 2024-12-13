
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { InstructorAprovedEvent } from "../events/instructor-approved-event";
import { UserModel } from "../../../../db/mongodb/models/userModel";






export class InstructorAprovedConsumer extends KafkaConsumer<InstructorAprovedEvent>{
   
    
    
    topic: Topics.instructorAproval = Topics.instructorAproval;
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