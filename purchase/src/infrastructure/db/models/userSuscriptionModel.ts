import mongoose from "mongoose";
import { IUserSubcription } from "../../../domain/entities/userSubscription";

const userSubscriptionScheema = new mongoose.Schema({
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
   instructorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true 
   },
   description:[{
    type:String,
    require:true 
   }]
},{
    timestamps:true,
    toJSON:{
        transform(dot,ret){
          delete ret.__v;
        }
    }
}
)

const userSubscriptionModel = mongoose.model<IUserSubcription>('UserSubscription',userSubscriptionScheema)
export {userSubscriptionModel} ; 