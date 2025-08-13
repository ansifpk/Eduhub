
import { Consumer } from "kafkajs";
import { KafkaConsumer, Topics } from "@eduhublearning/common";
import { ProfilePictureUpdatedEvent } from "@eduhublearning/common/build/events/profile-picture-updated-event";
import { UserModel } from "../../../../db/mongodb/models/userModel";




export class ProfilePictureUpdatedConsumer extends KafkaConsumer<ProfilePictureUpdatedEvent>{
   
    topic: Topics.pictureUpdated = Topics.pictureUpdated;
    groupId: string = "profile-picture-updated-group";
    constructor(consumer:Consumer){
        super(consumer)
    }
   async   onMessage(data: { _id: string; avatar: {id:string,avatar_url:string}; }): Promise<void> {
       try {
          const {_id,avatar} = data
          await UserModel.findByIdAndUpdate({_id:_id},{avatar})
       } catch (error) {
        console.error(error)
       }
    }
    
}