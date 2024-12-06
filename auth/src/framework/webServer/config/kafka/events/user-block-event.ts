
import { Topics } from "../topics/topics";

export interface UserBlockedEvent {
    topic: Topics.userBlcoked;
    data: {
        email:string;
        isBlock:boolean;
    };
}