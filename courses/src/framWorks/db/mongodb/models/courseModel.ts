import mongoose from "mongoose";

interface CourseAttr{
    instructorId?:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    topic:string,
    test?:[];
    subsription:boolean,
    videos:[],
    image:string,
    createAt:string,
}

interface CourseDoc extends mongoose.Document{
    instructorId?:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    topic:string,
    test?:[];
    subsription:boolean,
    videos:[],
    image:string,
    createAt:string,
}

interface CourseModel extends mongoose.Model<CourseDoc>{
    build(attr:CourseAttr):CourseDoc;
}

const courseScheema = new mongoose.Schema({
    instructorId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    subscription:{
        type:Boolean,
        required:true
    },
    test:{
        type:Array,
        required:true
    },
    videos:{
        type:Array,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }
});

courseScheema.statics.build = (attrs:CourseAttr)=>{
    return new Course(attrs)
}

const Course = mongoose.model<CourseDoc,CourseModel>('Course',courseScheema)
export { Course };