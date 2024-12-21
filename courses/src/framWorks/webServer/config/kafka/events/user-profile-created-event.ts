
import { Topics } from "../topics/topics";

export interface UserProfileCreatedEvent {
    topic: Topics.profileCreated;
    data: {
        _id: string;
        name: string;
        email: string;
        isInstructor:boolean,
        isBlock:boolean,
        isAdmin:boolean,
        createdAt:Date,
        avatar:{
            id:string,
            avatar_url:string
        }
    };
}