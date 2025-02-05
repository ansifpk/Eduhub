
import { Consumer, Producer } from "kafkajs";
import { userModel } from "../../../../db/mongoDB/models/userModel";
import kafkaWrapper from "../kafkaWrapper";
import { cartModel } from "../../../../db/mongoDB/models/cart";
import { Topics,KafkaConsumer, UserCreateEvent, UserProfileCreatedPublisher } from "@eduhublearning/common";


export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent>{
    topic: Topics.userCreated = Topics.userCreated;
    groupId: string = 'profile-user-created-group';
   
    constructor(consumer:Consumer){
        super(consumer)
    }
    async onMessage(data: { _id: string; name: string; email: string; isInstructor: boolean; }): Promise<void> {
        try {
            // console.log('Consumer received message user from auth service :', data);
            // Adding userDta to db in course Service
            const user = await userModel.create(data)
            if(user){
                await new UserProfileCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isInstructor: user.isInstructor,
                    isBlock: user.isBlock,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                    avatar: {
                        id: user.avatar.id,
                        avatar_url: user.avatar.avatar_url
                    }
                })
                
            }
        await cartModel.create({userId:data._id})
        } catch (error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }
}