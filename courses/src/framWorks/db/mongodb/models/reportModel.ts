

import mongoose from "mongoose";
import { IReport } from "../../../../entities/report";


const reportScheema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true,
   },
   courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course',
    require:true,
   },
   content:{
    type:String,
    require:true
   },
   report:{
    type:String,
    require:true
   }
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});

const reportModel = mongoose.model<IReport>('Report',reportScheema)
export {reportModel};