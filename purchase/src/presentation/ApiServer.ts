import { connectDB } from '../infrastructure/db/config';
import { UserProfileUpdatedConsumer } from '../infrastructure/kafka/consumer/user-profile-updated-consumer';
import kafkaWrapper from '../infrastructure/kafka/kafkaWrapper';
import { CourseCreatedConsumer } from '../infrastructure/kafka/consumer/course-created-consumer';
import { CourseListedConsumer } from '../infrastructure/kafka/consumer/course-listed-consumer';
import { CourseUpdatedConsumer } from '../infrastructure/kafka/consumer/course-updated-consumer';
import { EmailChangedConsumer } from '../infrastructure/kafka/consumer/email-changed-consumer';
import { InstructorAprovedConsumer } from '../infrastructure/kafka/consumer/instructor-approved-consumer';
import { ProfilePictureUpdatedConsumer } from '../infrastructure/kafka/consumer/picture-updated-consumer';
import { UserBlockedConsumer } from '../infrastructure/kafka/consumer/user-block-consumer';
import { UserProfileCreatedConsumer } from '../infrastructure/kafka/consumer/user-profile-created-consumer';
import { app } from '../app';


export class ApiServer {
      public static async run(port:number):Promise<void>{
        await kafkaWrapper.connect()
        const consumerUser = await kafkaWrapper.createConsumer("purchase-user-profile-created-group")
        const consumerCourse = await kafkaWrapper.createConsumer("purchase-course-created-group")
        const consumerCourseUpdated = await kafkaWrapper.createConsumer("purchase-course-updated-group")
        const consumerCourseListed = await kafkaWrapper.createConsumer("purchase-course-listed-group")
        const consumerInstructor = await kafkaWrapper.createConsumer("purchase-instructor-approved-group")
        const consumerBlock = await kafkaWrapper.createConsumer("purchase-user-blocked-group")
        const consumer1 = await kafkaWrapper.createConsumer("purchase-email-changed-group")
        const consumer2 = await kafkaWrapper.createConsumer("purchase-profile-updated-group")
        const pictureUpdatedConsumer = await kafkaWrapper.createConsumer("profile-picture-updated-group")
        consumerUser.connect();
        consumerCourse.connect();
        consumerCourseUpdated.connect();
        consumerInstructor.connect();
        consumerCourseListed.connect();
        consumerBlock.connect();
        consumer1.connect();
        consumer2.connect();
        pictureUpdatedConsumer.connect();
        const listener = new UserProfileCreatedConsumer(consumerUser)
        const listenerCourse = new CourseCreatedConsumer(consumerCourse)
        const listenerCourseUpdated = new CourseUpdatedConsumer(consumerCourseUpdated)
        const listenerCourseListed = new CourseListedConsumer(consumerCourseListed)
        const listenerInstructor = new InstructorAprovedConsumer(consumerInstructor)
        const blockUser = new UserBlockedConsumer(consumerBlock)
        const pictureUpdatedListener = new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer)
        await new EmailChangedConsumer(consumer1).listen();
        await new UserProfileUpdatedConsumer(consumer2).listen();
        await listener.listen()
        await listenerCourse.listen()
        await listenerCourseUpdated.listen()
        await listenerCourseListed.listen()
        await listenerInstructor.listen()
        await blockUser.listen()
        await pictureUpdatedListener.listen()
        await connectDB()
        
        app.listen(port,()=>console.log(`purchase service running on port ${port}`))
      }     
}