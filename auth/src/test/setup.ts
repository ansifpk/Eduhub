import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
// import 
let mongo:any ;
beforeAll(async()=>{
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