import { Publisher } from "../base-publisher";
import { InstructorAprovedEvent } from "../events/instructor-approved-event";
import { Topics } from "../topics/topics";


export class instructorAprovalPublisher extends Publisher<InstructorAprovedEvent>{
    topic: Topics.instructorAproval = Topics.instructorAproval;
}