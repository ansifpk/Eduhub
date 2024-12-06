
import { Consumer, Producer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { UserCreateEvent } from "../events/user-created-event";
import { Topics } from "../topics/topics";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import kafkaWrapper from "../kafkaWrapper";
import { InstructorAprovedEvent } from "../events/instructor-approved-event";



export class InstructorAprovalConsumer extends KafkaConsumer<InstructorAprovedEvent>{
    topic: Topics.instructorAproval = Topics.instructorAproval;
    groupId: string = "auth-instructor-aproval-group";
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; }): Promise<void> {
        try {
            console.log('Consumer received message user from user service :', data);
            const {email,isInstructor} = data
            // Adding userDta to db in course Service
             await userModel.findOneAndUpdate({email:email},{$set:{isInstructor:isInstructor}},{new:true});
            
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}