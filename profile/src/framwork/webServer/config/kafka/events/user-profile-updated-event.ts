
import { Topics } from "../topics/topics";

export interface UserProfileUpdatedEvent {
    topic: Topics.profileUpdated;
    data: {
        _id: string;
        name: string;
    };
}