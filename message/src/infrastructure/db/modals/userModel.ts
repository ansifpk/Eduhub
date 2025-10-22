import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../../domain/entities/user";

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

const userModel = model<IUser>('User',userScheema);
export {userModel}