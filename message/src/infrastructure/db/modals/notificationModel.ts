import mongoose, { model, Schema } from "mongoose";
import { INotification } from "../../../domain/entities/notifications";

const notificationScheema = new Schema({

   date:{
    type:Date,
    default: Date.now,
   },
   senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default: Date.now,
   },
   recipientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default: Date.now,
   },
   isRead:{
    type:Boolean,
    default: false,
   }

},{

      timestamps:true,
      toJSON:{
         transform(doc,ret){
            delete ret.__v;
          }
      }
      
})

const notificationModel = model<INotification>('Notification',notificationScheema);
export {notificationModel}