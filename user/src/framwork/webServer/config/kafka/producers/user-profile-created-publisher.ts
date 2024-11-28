
import { Publisher } from "../base-publisher";
import { UserProfileCreateEvent } from "../events/user-profile-created-event";
import { Topics } from "../topics/topics";


export class UserProfileCreatedPublisher extends Publisher<UserProfileCreateEvent>{
    topic: Topics.profileUpdated = Topics.profileUpdated;
}