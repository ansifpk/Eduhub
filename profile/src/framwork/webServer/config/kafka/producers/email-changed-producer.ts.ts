import { Publisher } from "../base-publisher";
import { EmailChangedEvent } from "../events/email-changed-event";
import { Topics } from "../topics/topics";

export class EmailChangedPublisher extends Publisher<EmailChangedEvent>{
    topic: Topics.emailChanged = Topics.emailChanged;
}