// import mongoose from "mongoose";

import mongoose from "mongoose";
import { ICourse } from "../../../../entities/course";


const courseScheema = new mongoose.Schema({
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
    description:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    subscription:{
        type:Boolean,
        required:true,
        default: false
    },
    test:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Test'
    },
    price:{
        type:Number,
        required:true
    },
    isListed:{
        type:Boolean,
        required:true,
        default:false
    },
    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    sections:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section',
        }
    ],
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});

const Course = mongoose.model<ICourse>('Course',courseScheema)
export {Course} ;