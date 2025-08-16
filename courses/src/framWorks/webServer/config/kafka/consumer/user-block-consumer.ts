
import { Consumer } from "kafkajs";
import { Topics,UserBlockedEvent,KafkaConsumer } from "@eduhublearning/common";
import { UserModel } from "../../../../db/mongodb/models/userModel";


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
            console.error(error)
        }
    }

    
}