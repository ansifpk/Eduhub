
import { Consumer } from "kafkajs";
import { UserModel } from "../../../../db/mongoDB/models/userMode";
import { KafkaConsumer, Topics ,UserBlockedEvent} from "@eduhublearning/common";


export class UserBlockedConsumer extends KafkaConsumer<UserBlockedEvent>{

    
    topic: Topics.userBlcoked = Topics.userBlcoked;
    groupId: string = "purchase-user-blocked-group";
    constructor(consumer:Consumer){
        super(consumer)
    }

     async onMessage(data: { _id: string; isBlock: boolean; }): Promise<void> {
        try {
            const { _id,isBlock} = data;
           await UserModel.findByIdAndUpdate({_id:_id},{$set:{isBlock:isBlock}})
        } catch (error) {
            console.error(error);
        }
    }

    
}