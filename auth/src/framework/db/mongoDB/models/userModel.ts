import { model, Schema } from "mongoose";
// import mongoose from "mongoose";
import { Iuser } from "../../../../entities/user";

// // an interface describe the properties theat need to create a user

// interface UserAttrs {
//     email:string;
//     name:string;
//     password:string;
//     isAdmin?:boolean;
//     isInstructor?:boolean;
//     isVerified?:boolean;
//     isBlock?:boolean;
// }

// // an interface that describe the properties of the user model has.

// interface UserModel extends mongoose.Model<UserDoc>{
//    build(attrs: UserAttrs): UserDoc;
// }
// // interface that describe the properties that a user Document has

// interface UserDoc extends mongoose.Document {
//     email:string;
//     name:string;
//     password:string;
//     isAdmin:boolean;
//     isInstructor:boolean;
//     isVerified:boolean;
//     isBlock:boolean;
// }
// const userScheema = new mongoose.Schema({
//     name:{
//        type: String,
//        require:true
//     },
//     email:{
//        type: String,
//        require:true
//     },
//     password:{
//        type: String,
//        require:true
//     },
//     isAdmin:{
//        type: String,
//        default : false,
//        require:true
//     },
//     isBlock:{
//        type: String,
//        default : false,
//        require:true
//     },
//     isInstructor:{
//        type: String,
//        default : false,
//        require:true
//     },
//     isVerified:{
//        type: String,
//        default : false,
//        require:true
//     }
// })
// userScheema.statics.build = (attrs:UserAttrs) =>{
//     return new userModel(attrs)
// }
// const userModel = mongoose.model<UserDoc,UserModel>('User',userScheema);

const userScheema = new Schema({
    name:{
       type: String,
       require:true
    },
    email:{
       type: String,
       require:true
    },
    password:{
       type: String,
       require:true
    },
    isAdmin:{
       type: Boolean,
       default : false,
       require:true
    },
    isBlock:{
       type: Boolean,
       default : false,
       require:true
    },
    isInstructor:{
       type: Boolean,
       default : false,
       require:true
    },
    isVerified:{
       type: Boolean,
       default : true,
       require:true
    },
    createdAt:{
       type: String,
       default : new Date().toLocaleString(),
       require:true
    }
},{
   toJSON:{
      transform(doc,ret){
         delete ret.__v;
       }
   }
})

const userModel = model<Iuser>('User',userScheema);
export {userModel}