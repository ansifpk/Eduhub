 
import {MongoMemoryServer}  from 'mongodb-memory-server'
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async ()=>{
    process.env.JWT_ACCESSKEY = 'test_access_secret';
    process.env.JWT_REFRESHKEY = 'test_refresh_secret';
    process.env.JWT_VERIFICATIONKEY = 'test_verify_secret';
    process.env.EMAIL = "test@test.com";
    process.env.PASSWORD = "dummy";
    process.env.CLOUD_NAME= "test_cloud_name";
    process.env.CLOUD_KEY="test_cloud_key";
    process.env.CLOUD_SECRET="test_cloud_secret";
    process.env.KAFKA_BROCKER = "kafka-srv:9092";
    process.env.ORGINS = '["https://eduhub.fasionstoredress.shop"]'

    mongo = await MongoMemoryServer.create(); 
    const mongoUri = mongo.getUri();          
    await mongoose.connect(mongoUri)
});

beforeEach(async () =>{
  const collections =  await mongoose.connection.db?.collections();
   if (!collections) return;
  if (collections && collections.length > 0){
    for(let collection of collections ){
        await collection.deleteMany({});
      }
  }
  
})

afterAll(async ()=> {
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
})



