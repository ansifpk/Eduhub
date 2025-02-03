import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../../../entities/user";
import { IChat } from "../../../../entities/chat";

const chatScheema = new Schema({

    members:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    role:{
        type:String,
        require:true
    },
    isBlock:{
        type:Boolean,
        required:false,
        default:false
    },
    lastSeen:{
        type:Date,
        required:false,
    },

},{

      timestamps:true,
      toJSON:{
         transform(doc,ret){
            delete ret.__v;
          }
      }
      
})

const chatModel = model<IChat>('Chat',chatScheema);
export {chatModel}