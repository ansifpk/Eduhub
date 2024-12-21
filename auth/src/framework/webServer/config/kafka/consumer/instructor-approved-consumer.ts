
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import { InstructorAprovedEvent } from "../events/instructor-approved-event";



export class InstructorAprovedConsumer extends KafkaConsumer<InstructorAprovedEvent>{
    topic: Topics.instructorAproved = Topics.instructorAproved;
    groupId: string = "auth-instructor-aproved-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string;isInstructor: boolean; }): Promise<void> {
        try {
            // console.log('Consumer received message user from user service :', data);
 
            // Adding userDta to db in course Service
            await userModel.findOneAndUpdate({_id:data._id},{$set:{isInstructor:data.isInstructor}},{new:true});
          
            
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}