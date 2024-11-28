

import { Topics } from "../topics/topics";

export interface OrderCreateEvent {
    topic: Topics.orderCreated;
    data: {
        _id: string;
        userId:string
    };
}