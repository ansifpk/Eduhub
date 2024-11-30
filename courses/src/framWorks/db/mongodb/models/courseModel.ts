// import mongoose from "mongoose";

import mongoose from "mongoose";
import { ICourse } from "../../../../entities/course";

// interface CourseAttr{
//     _id?:string,
//     instructorId?:string,
//     subCategory:string,
//     description:string,
//     level:string,
//     thumbnail:string,
//     category:string,
//     topic:string,
//     price:number,
//     test?:[];
//     subscription:boolean,
//     videos:string[],
//     image:string,
//     createAt:string,
// }

// interface CourseDoc extends mongoose.Document{
   
//     instructorId?:string,
//     subCategory:string,
//     description:string,
//     thumbnail:string,
//     level:string,
//     price:number,
//     category:string,
//     topic:string,
//     test?:[];
//     subscription:boolean,
//     videos:string[],
//     image:string,
//     createAt:string,
// }

// interface CourseModel extends mongoose.Model<CourseDoc>{
//     build(attr:CourseAttr):CourseDoc;
// }

// const courseScheema = new mongoose.Schema({
//     instructorId:{
//         type:String,
//         required:true
//     },
//     subCategory:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     level:{
//         type:String,
//         required:true
//     },
//     thumbnail:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true
//     },
//     subscription:{
//         type:Boolean,
//         required:true,
//         default: false
//     },
//     test:{
//         type:Array,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     videos:{
//         type:Array,
//         required:true
//     },
//     createdAt:{
//         type:String,
//         required:true,
//         default: new Date().toLocaleString(),
//     }
// },{
//     toJSON: {
//       transform(doc,ret){
//         delete ret.__v;
//       }
//     }
// });

// courseScheema.statics.build = (attrs:CourseAttr)=>{
//     return new Course(attrs)
// }

// const Course = mongoose.model<CourseDoc,CourseModel>('Course',courseScheema)
// export { Course };

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

const Course = mongoose.model<ICourse>('Course',courseScheema)
export {Course} ;