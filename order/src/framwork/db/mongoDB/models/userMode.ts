import mongoose from "mongoose";
import { Iuser } from "../../../../entities/user";


const userScheema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isInstructor:{
        type:Boolean,
        required:true
    },
    isBlock:{
        type:Boolean,
        required:true
    }
});
const UserModel = mongoose.model<Iuser>('User',userScheema)
export { UserModel } ;