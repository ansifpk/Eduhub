import mongoose from "mongoose";
import { IOrder } from "../../../../entities/order";



const orderScheema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'User'
  },
  course:{
    type:Object,
    require:true
  },
  discountAmount:{
    type:Number,
    require:true
  }
},{
  timestamps:true,
  toJSON: {
    transform(doc,ret){
      delete ret.__v;
    }
  }
});

const OrderModel = mongoose.model<IOrder>('Order',orderScheema)
export {OrderModel} ;