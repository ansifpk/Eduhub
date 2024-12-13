
import { Topics } from "../topics/topics";

export interface UserProfileCreateEvent {
    topic: Topics.profileUpdated;
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