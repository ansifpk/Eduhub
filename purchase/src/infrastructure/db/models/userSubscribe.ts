import mongoose from "mongoose";
import { IUserSubscribe } from "../../../domain/entities/userSubscribe";

const userSubscribeScheema = new mongoose.Schema({
   customerId:{ 
    type:String,
    require:true 
   },
   subscriptionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserSubscription",
    require:true 
   },
   subscription:{
    type:String,
    require:true 
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   cancel_At:{
    type:Date,
    index:{expires:0},
   }
},{
    timestamps:true,
    toJSON:{
        transform(dot,ret){
          delete ret.__v;
        }
    }
}
)

const userSubscribeModel = mongoose.model<IUserSubscribe>('UserSubscribe',userSubscribeScheema)
export {userSubscribeModel} ; 