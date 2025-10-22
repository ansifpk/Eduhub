import mongoose, { model, Schema } from "mongoose";
import { IMessage } from "../../../domain/entities/message";


const messageScheema = new Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    senderId:{
        type:String,
        require:true
    },
    text:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        required:false,
        default:false
    }
},{

      timestamps:true,
      toJSON:{
         transform(doc,ret){
            delete ret.__v;
          }
      }
      
})

const messageModel = model<IMessage>('Message',messageScheema);
export {messageModel}