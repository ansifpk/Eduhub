
import { Consumer } from "kafkajs";
import { KafkaConsumer } from "../base-listener";
import { Topics } from "../topics/topics";
import { UserModel } from "../../../../db/mongodb/models/userModel";
import { Course } from "../../../../db/mongodb/models/courseModel";
import { UserBlockedEvent } from "../events/user-block-event";


export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "course-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { _id: string; isBlock: boolean; }): Promise<void> {
        try {
            const {_id,isBlock} = data;
           await UserModel.findByIdAndUpdate({_id:_id},{$set:{isBlock:isBlock}},{new:true})
        } catch (error) {
            
        }
    }

    
}