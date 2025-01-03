
import { Publisher } from "../base-publisher";
import { UserProfileUpdatedEvent } from "../events/user-profile-updated-event";
import { Topics } from "../topics/topics";


export class UserProfileUpdatedPublisher extends Publisher<UserProfileUpdatedEvent>{
    topic: Topics.profileUpdated = Topics.profileUpdated;
}