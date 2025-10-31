import mongoose from "mongoose";
import { IRating } from "../../../domain/entities/ratings";

const ratingScheema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
         ref:"User"
    },
    review:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
const ratingModel = mongoose.model<IRating>('Rating',ratingScheema)
export { ratingModel } ;