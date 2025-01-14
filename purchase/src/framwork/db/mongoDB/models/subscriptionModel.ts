import mongoose from "mongoose";
import { ISubcription } from "../../../../entities/subscription";

const subscriptionScheema = new mongoose.Schema({
   price:{
    type:Number,
    require:true 
   },
   plan:{
    type:String,
    require:true 
   },
   productId:{
    type:String,
    require:false
   },
   priceId:{
    type:String,
    require:false
   },
   description:[{
    type:String,
    require:true 
   }],
   users:[
    {
      _id:{
        type:String,
      }, 
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    }
  ],
},{
    timestamps:true,
    toJSON:{
        transform(dot,ret){
          delete ret.__v;
        }
    }
}
)

const subscriptionModel = mongoose.model<ISubcription>('Subscription',subscriptionScheema)
export {subscriptionModel} ; 