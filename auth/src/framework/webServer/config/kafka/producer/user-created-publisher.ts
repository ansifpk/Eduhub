
import { Publisher } from "../base-publisher";
import { UserCreateEvent } from "../events/user-created-event";
import { Topics } from "../topics/topics";


export class UserCreatedPublisher extends Publisher<UserCreateEvent>{
    topic: Topics.userCreated = Topics.userCreated;
}