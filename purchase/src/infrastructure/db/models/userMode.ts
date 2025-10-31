import mongoose from "mongoose";
import { Iuser } from "../../../domain/entities/user";

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
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    avatar:{
        id:{
            type:String,
            require:true
        },
        avatar_url:{
            type:String,
            require:true
        }
    }
});
const UserModel = mongoose.model<Iuser>('User',userScheema)
export { UserModel } ;