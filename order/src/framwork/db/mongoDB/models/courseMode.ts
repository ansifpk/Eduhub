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
    students:{
        type:Array,
        ref:'User'
    },
    sessions:[
     {
        sessionTitle:{
            type:String,
            require:true
        },
        lectures:[{
            content:{
               _id:{
                type:String,
                required:true
               },
               video_url:{
                type:String,
                require:true
               }
            },
            duration:{
                type:String,
                require:true
            },
            title:{
                type:String,
                require:true
            }
        }]
     }    
    ],
},{
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
const courseModel = mongoose.model<ICourse>('Course',courseScheema)
export {courseModel} ;