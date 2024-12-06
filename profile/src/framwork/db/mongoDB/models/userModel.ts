import mongoose, { model, Schema } from "mongoose";
import { Iuser } from "../../../../entities/user";

const userScheema = new Schema({
   _id:{
     type:mongoose.Schema.Types.ObjectId,
     require:true
   },
    name:{
       type: String,
       require:true
    },
    email:{
       type: String,
       require:true
    },
    password:{
       type: String,
       require:true
    },
    isAdmin:{
       type: Boolean,
       default : false,
       require:true
    },
    isBlock:{
       type: Boolean,
       default : false,
       require:true
    },
    isInstructor:{
       type: Boolean,
       default : false,
       require:true
    },
    status:{
       type: String,
       default : "none",
       require:true
    },
    isVerified:{
       type: Boolean,
       default : true,
       require:true
    },
    createdAt:{
       type: String,
       default : new Date().toLocaleString(),
       require:true
    },
    experience:{
      type:String,
      default:"",
      require:true
    },
    qualification:{
      type:String,
      default:"",
      require:true
    },
    certificate:{
        id:{
         type:String,
         default:"1",
         require:true
        },
        certificate_url:{
         type:String,
         default:"",
         require:true
        }
    },
    cv:{
      id:{
         type:String,
         default:"1",
         require:true
        },
        cv_url:{
         type:String,
         default:"",
         require:true
        }
    },
    avatar:{
      id:{
         type:String,
         default:"1",
        },
        avatar_url:{
         type:String,
         default:"",
        }
    }
   },{
      toJSON:{
         transform(doc,ret){
            delete ret.__v;
          }
      }
   })

const userModel = model<Iuser>('User',userScheema);
export {userModel}