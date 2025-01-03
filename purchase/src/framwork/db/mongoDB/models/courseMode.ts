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
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isListed:{
        type:Boolean,
        required:true,
        default:true
    },
    createdAt:{
        type:String,
        required:true,
        default: new Date().toLocaleString(),
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
    ]
},{
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
const courseModel = mongoose.model<ICourse>('Course',courseScheema)
export {courseModel} ;





 
  
  
 