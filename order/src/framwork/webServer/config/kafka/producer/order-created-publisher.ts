
import { Publisher } from "../base-publisher";
import { OrderCreateEvent } from "../events/order-created-event";
import { Topics } from "../topics/topics";


export class OrderCreatedPublisher extends Publisher<OrderCreateEvent>{
    topic: Topics.orderCreated = Topics.orderCreated;
}