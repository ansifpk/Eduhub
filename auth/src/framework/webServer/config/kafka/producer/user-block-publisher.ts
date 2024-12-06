
import { Publisher } from "../base-publisher";
import { UserBlockedEvent } from "../events/user-block-event";
import { Topics } from "../topics/topics";


export class UserBlcokedPublisher extends Publisher<UserBlockedEvent>{
    topic: Topics.userBlcoked = Topics.userBlcoked;
}