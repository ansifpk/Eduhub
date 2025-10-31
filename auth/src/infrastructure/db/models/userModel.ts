import { model, Schema } from "mongoose";
import { Iuser } from "../../../domain/entities/user";

const userScheema = new Schema({
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
    isVerified:{
       type: Boolean,
       default : true,
       require:true
    },
},{
   timestamps:true,
   toJSON:{
      transform(doc,ret){
         delete ret.__v;
       }
   }
})

const userModel = model<Iuser>('User',userScheema);
export {userModel}