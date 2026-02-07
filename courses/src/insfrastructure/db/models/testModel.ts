import mongoose from "mongoose";
import { ITest } from "../../../domain/entities/tests";


const testScheema = new mongoose.Schema({
    test:[
        {
            question:{
                type:String,
                required:true
            },
            option1:{
                type:String,
                required:true
            },
            option2:{
                type:String,
                required:true
            },
            option3:{
                type:String,
                required:true
            },
            option4:{
                type:String,
                required:true
            },
            answer:{
                type:String,
                required:true
            }
        }
    ],
    students:[
          {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            score: {
                type: Number,
            }
          }
       ],
},{
    timestamps:true,
    toJSON: {
      transform(doc,ret){
        delete ret.__v;
      }
    }
});

const testModel = mongoose.model<ITest>('Test',testScheema)
export {testModel};