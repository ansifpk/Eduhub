import { Topics } from "../topics/topics";

export interface EmailChangedEvent {
    topic: Topics.emailChanged;
    data: {
        _id: string;
        email:string
    };
}