 
import {MongoMemoryServer}  from 'mongodb-memory-server'
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async ()=>{
    process.env.JWT_ACCESSKEY = 'test_access_secret';
    process.env.JWT_REFRESHKEY = 'test_refresh_secret';
    process.env.JWT_VERIFICATIONKEY = 'test_verify_secret';
    process.env.BUCKET_NAME="eduhub-project-bucket";
    process.env.BUCKET_REGION="test_region";
    process.env.BUCKET_ACCESS_KEY="test_bucket_access_key"
    process.env.BUCKET_SECRET_KEY="test_bucket_secret_key"
    process.env.STRIPE_SECRET="test_stripe_secret_key"
    process.env.STRIPE_WEBHOOK_SECRET="test_stripe_webhook_secret_key"
    process.env.CLOUD_NAME="tets_cloud_name"
    process.env.CLOUD_KEY="tets_cloud_key"
    process.env.CLOUD_SECRET="tets_cloud_secret"
    process.env.success_url="https://eduhub-s2po.vercel.app/user/success"
    process.env.cancel_url="https://eduhub-s2po.vercel.app/user/faile"
    process.env.DOMAIN="https://eduhub.fasionstoredress.shop"
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



