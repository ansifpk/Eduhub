import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../../../entities/user";
import { IChat } from "../../../../entities/chat";

const chatScheema = new Schema({

    members:{
        type:Array,
        required:true
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