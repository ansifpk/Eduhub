import mongoose from "mongoose";
import { IInstructorSubscribe } from "../../../domain/entities/instructorSubscribe";

const instructotSubscribeScheema = new mongoose.Schema({
   customerId:{
    type:String,
    require:true 
   },
   subscriptionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subscription",
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

const instructotSubscribeModel = mongoose.model<IInstructorSubscribe>('InstructorSubscribe',instructotSubscribeScheema)
export {instructotSubscribeModel} ; 