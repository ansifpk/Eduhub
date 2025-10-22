import dotenv from 'dotenv';
import { ApiServer } from './presentation/ApiServer';
import kafkaWrapper from './infrastructure/kafka/kafkaWrapper';
import { UserProfileCreatedConsumer } from './infrastructure/kafka/consumer/user-profile-created-consumer';
import { InstructorAprovalConsumer } from './infrastructure/kafka/consumer/instructor-approved-consumer';
import { UserBlockedConsumer } from './infrastructure/kafka/consumer/user-block-consumer';
import { UserProfileUpdatedConsumer } from './infrastructure/kafka/consumer/user-profile-updated-consumer';
import { ProfilePictureUpdatedConsumer } from './infrastructure/kafka/consumer/picture-updated-consumer';
dotenv.config();

async function main(){
  
        await kafkaWrapper.connect();
        const userCreatedConsumer = await kafkaWrapper.createConsumer('message-user-created-group')
        const consumser = await kafkaWrapper.createConsumer('message-instructor-approved-group')
        const consumser2 = await kafkaWrapper.createConsumer('message-user-blocked-group')
        const consumser3 = await kafkaWrapper.createConsumer('message-profile-updated-group')
        const pictureUpdatedConsumer = await kafkaWrapper.createConsumer("profile-picture-updated-group")
        const emailChangeConsumer = await kafkaWrapper.createConsumer("message-email-changed-group")
        userCreatedConsumer.connect();
        consumser.connect();
        consumser2.connect();
        consumser3.connect();
        pictureUpdatedConsumer.connect();
        emailChangeConsumer.connect();
        const listener1 = new UserProfileCreatedConsumer(userCreatedConsumer)
        const listener2 = new InstructorAprovalConsumer(consumser)
        const listener3 = new UserBlockedConsumer(consumser2)
        const listener4 = new UserProfileUpdatedConsumer(consumser3)
        const pictureUpdatedListener = new ProfilePictureUpdatedConsumer(pictureUpdatedConsumer)
        await new ProfilePictureUpdatedConsumer(emailChangeConsumer).listen()
        await listener1.listen();
        await listener2.listen();
        await listener3.listen();
        await listener4.listen();
        await pictureUpdatedListener.listen();
  await ApiServer.run(Number(process.env.PORT)!);

}
main();