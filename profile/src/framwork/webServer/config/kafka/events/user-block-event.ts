
import { Topics } from "../topics/topics";

export interface UserBlockedEvent {
    topic: Topics.userBlcoked;
    data: {
        _id: string;
        isBlock:boolean;
    };
}