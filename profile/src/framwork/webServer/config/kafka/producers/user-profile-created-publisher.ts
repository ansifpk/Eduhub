
import { Publisher } from "../base-publisher";
import { UserProfileCreatedEvent } from "../events/user-profile-created-event";
import { Topics } from "../topics/topics";


export class UserProfileCreatedPublisher extends Publisher<UserProfileCreatedEvent>{
    topic: Topics.profileCreated = Topics.profileCreated;
}