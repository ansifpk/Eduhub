
import { connectDB } from '../infrastructure/db/config';
import { EmailChangedConsumer } from '../infrastructure/kafka/consumer/email-changed-consumer';
import kafkaWrapper from '../infrastructure/kafka/kafkaWrapper';
import { CourseCreatedConsumer } from '../infrastructure/kafka/consumer/course-created-consumer';
import { CourseListedConsumer } from '../infrastructure/kafka/consumer/course-listed-consumer';
import { CourseUpdatedConsumer } from '../infrastructure/kafka/consumer/course-updated-consumer';
import { OrderCreatedCreateConsumer } from '../infrastructure/kafka/consumer/order-created-consumer';
import { UserBlockedConsumer } from '../infrastructure/kafka/consumer/user-block-consumer';
import { UserCreatedConsumer } from '../infrastructure/kafka/consumer/user-created-consumer';
import { app } from '../app';

export class ApiServer {
    
    public  static async run(port:number):Promise<void>{
       
       
       await kafkaWrapper.connect();
    const userCreatedConsumer = await kafkaWrapper.createConsumer(
      "profile-user-created-group"
    );
    const userBlockedConsumer = await kafkaWrapper.createConsumer(
      "profile-user-blocked-group"
    );
    const consumerCourse = await kafkaWrapper.createConsumer(
      "profile-course-created-group"
    );
    const consumerCourseUpdated = await kafkaWrapper.createConsumer(
      "profile-course-updated-group"
    );
    const consumerCourseListed = await kafkaWrapper.createConsumer(
      "profile-course-listed-group"
    );
    const consumer = await kafkaWrapper.createConsumer(
      "profile-order-created-group"
    );
    const emailChangeConsumer = await kafkaWrapper.createConsumer(
      "profile-email-changed-group"
    );
    consumer.connect();
    consumerCourse.connect();
    consumerCourseUpdated.connect();
    consumerCourseListed.connect();
    userCreatedConsumer.connect();
    userBlockedConsumer.connect();
    emailChangeConsumer.connect();
    const listener = new UserCreatedConsumer(userCreatedConsumer);
    await listener.listen();
    const listener2 = new UserBlockedConsumer(userBlockedConsumer);
    await listener2.listen();
    await new CourseCreatedConsumer(consumerCourse).listen();
    await new CourseListedConsumer(consumerCourseUpdated).listen();
    await new CourseUpdatedConsumer(consumerCourseListed).listen();
    await new OrderCreatedCreateConsumer(consumer).listen();
    await new EmailChangedConsumer(emailChangeConsumer).listen();
    await connectDB();
       app.listen(port,()=>console.log(`profile service start running on port ${port}`))
    }
}