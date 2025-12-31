 
import {MongoMemoryServer}  from 'mongodb-memory-server'
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async ()=>{
    process.env.JWT_KEY = 'imAnsif';
    mongo = await MongoMemoryServer.create(); // Use create to start the server
  const mongoUri = mongo.getUri();          // Get the URI after the server is started

    await mongoose.connect(mongoUri)
});

beforeEach(async () =>{
  const collections =  await mongoose.connection.db?.collections();
  if (collections && collections.length > 0){
    for(let collection of collections ){
        await collection.deleteMany({});
      }
  }
  
})

afterAll(async ()=> {
    await mongo.stop();
    await mongoose.connection.close();
})



