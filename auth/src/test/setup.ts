 
import {MongoMemoryServer}  from 'mongodb-memory-server'
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async ()=>{
    process.env.JWT_ACCESSKEY = 'test_access_secret';
    process.env.JWT_REFRESHKEY = 'test_refresh_secret';
    process.env.JWT_VERIFICATIONKEY = 'test_verify_secret';
    process.env.EMAIL = "test@gmail.com";
    process.env.PASSWORD = "testemailpassword";
    process.env.KAFKA_BROKER = "kafka-srv:9092";
    process.env.JWT_FORGOTPASSWORDEY = "test_forget_password";
    process.env.DOMAIN= "eduhub.fasionstoredress.shop";
    process.env.ORGINS = '["https://eduhub.fasionstoredress.shop"]';
    process.env.SOCKET_PATH="/auth/socket.io";
    mongo = await MongoMemoryServer.create(); 
    const mongoUri = mongo.getUri();          
    await mongoose.connect(mongoUri);
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



