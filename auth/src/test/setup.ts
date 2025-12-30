import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
// import 
let mongo:any ;
beforeAll(async()=>{
   process.env.JWT_ACCESSKEY = 'itsjwtaccesskey'
   process.env.JWT_REFRESHKEY = 'itsjwtRefreshkey'
   process.env.JWT_VERIFICATIONKEY = 'itsjwtverificationkey'
   process.env.JWT_FORGOTPASSWORDEY = 'itsjwtForgetkey'
   process.env.EMAIL = 'pkansif39@gmail.com'
   process.env.PASSWORD = 'tvtq zgcc skhn rliu'
   process.env.KAFKA_BROCKER = 'kafka-srv:9092'
   process.env.DOMAIN= 'api.eduhublearning.online'
   process.env.ORGINS = JSON.stringify(["http://client-srv:5173","http://localhost:5173","https://www.eduhublearning.online","https://api.eduhublearning.online","https://eduhub-s2po.vercel.app"])
   process.env.SOCKET_PATH='/auth/socket.io'
   mongo = await MongoMemoryServer.create();
    const mongoUri =  await mongo.getUri()

    await mongoose.connect(mongoUri);
});
beforeEach(async()=>{
   const collections = await mongoose.connection.db!.collections();
   for (let collection of collections) {
      await collection.deleteMany()
   }
})
afterAll(async()=>{
   await mongoose.connection.close()
   await mongo.stop()
});