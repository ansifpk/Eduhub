import { Publisher } from "../base-publisher";
import { InstructorAprovedEvent } from "../events/instructor-approved-event";
import { Topics } from "../topics/topics";


export class InstructorAprovalPublisher extends Publisher<InstructorAprovedEvent>{
    topic: Topics.instructorAproved = Topics.instructorAproved;
}