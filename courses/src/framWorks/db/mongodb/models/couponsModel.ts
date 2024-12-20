import mongoose from "mongoose";
import { ICoupon } from "../../../../entities/coupon";

const cupenModel = new mongoose.Schema({
   
title:{
    type:String,
    require:true
 },
description:{
    type:String,
    require:true
 },
 couponCode:{
    type:String,
    require:true
 },
 offer:{
    type:Number,
    require:true
 },
  expiryDate:{
    type:Date,
    require:true
 },
 users:{
     type:mongoose.Schema.Types.ObjectId,
     require:true,
     ref:"User"
 }
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});
const couponModel = mongoose.model<ICoupon>('Coupon',cupenModel)
export { couponModel } ;