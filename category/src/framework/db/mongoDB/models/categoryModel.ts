import mongoose, { model, Schema } from "mongoose";
import { ICategory } from "../../../../entities/category";


const categoryScheema = new Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    isListed:{
        type:Boolean,
        default:true,
    },
    topics:{
        type:Array,
        require: true
    },
})

const categoryModel = model<ICategory>('Category',categoryScheema);
export {categoryModel}