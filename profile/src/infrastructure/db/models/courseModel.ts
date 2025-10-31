
import mongoose from "mongoose";
import { ICourse } from "../../../domain/entities/course";



const courseScheema = new mongoose.Schema({
    _id:{
         type:mongoose.Schema.Types.ObjectId,
         require:true
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    image:{
       _id:{
        type:String,
        required:true
       },
       image_url:{
        type:String,
        required:true
       }
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    subscription:{
        type:Boolean,
        required:true,
        default: false
    },
    price:{
        type:Number,
        required:true
    },
    isListed:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});

const courseModel = mongoose.model<ICourse>('Course',courseScheema)
export {courseModel} ;