import mongoose from "mongoose";
import { IOrder } from "../../../../entities/order";



const orderScheema = new mongoose.Schema({
  user:{
    type:Object,
    require:true
  },
  product:{
    type:Object,
    require:true
  },
  orderDate:{
    type:String,
    require:true,
    default: new Date().toLocaleString(),
  }
});

const OrderModel = mongoose.model<IOrder>('Order',orderScheema)
export {OrderModel} ;