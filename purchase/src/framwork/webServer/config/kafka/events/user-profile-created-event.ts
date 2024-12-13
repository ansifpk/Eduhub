
import { Topics } from "../topics/topics";

export interface UserProfileCreateEvent {
    topic: Topics.profileUpdated;
    data: {
        _id: string;
        name: string;
        email: string;
        isInstructor:boolean,
        isAdmin:boolean,
        isBlock:boolean,
        createdAt:Date,
        avatar:{
            id:string,
            avatar_url:string
        }
    };
}