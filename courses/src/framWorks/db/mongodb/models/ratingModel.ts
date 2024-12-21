//   userId:Iuser,
//     review:string,
//     stars:number,

import mongoose from "mongoose";
import { IRating } from "../../../../entities/ratings";

const ratingScheema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
         ref:"Course"
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