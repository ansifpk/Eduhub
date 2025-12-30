import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async () => {
   process.env.EMAIL = 'pkansif39@gmail.com'
   process.env.PASSWORD = 'tvtq zgcc skhn rliu'
   process.env.JWT_ACCESSKEY = 'itsjwtaccesskey'
   process.env.JWT_REFRESHKEY = 'itsjwtRefreshkey'
   process.env.JWT_VERIFICATIONKEY = 'itsjwtverificationkey'
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
}, 60000);

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Close all connections properly
  await mongoose.connection.close();
  
  if (mongo) {
    await mongo.stop();
  }
  
  // Clear all timers and handles
  await new Promise(resolve => setTimeout(resolve, 100));
}, 60000);