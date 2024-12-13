import mongoose from "mongoose";
import { ICourse } from "../../../entities/course";
import { IUserRepository } from "../../../useCases/interfaces/repository/IUserRepository";
import { Query } from "../../webServer/types/type";
import { Course } from "../mongodb/models/courseModel";



export class UserRepository implements IUserRepository{

    constructor(private courseModel:typeof Course){}

    async findWithCondition(userId: string): Promise<ICourse[] | void> {
        try {
           
            const courses = await this.courseModel.find({ students: userId} ).populate("instructorId").populate("students")
            if(courses){
                return courses
            }
            
        } catch (error) {
            console.error(error)
        }
       
    }

    async find(query:Query): Promise<ICourse[] | void> {
       try {
        const {page,search,category,level,topic} = query
        console.log("category",typeof category, category);
        console.log("level",typeof level, level);
        console.log("topic",typeof topic, topic);
        console.log("search",typeof search, search);
        console.log("page",typeof search, page);
        let queryData:any = {isListed:true}
        if(category){
            queryData.category = { $regex: category, $options: "i" };
        }
        if(topic){
            queryData.topic = { $regex: topic, $options: "i" };
        }
        if(level){
            queryData.level = { $regex: level, $options: "i" };
        }
        if(search){
            queryData.title = {$regex:search,$options: "i"}
        }
        let limit = 8
        console.log("quw",queryData);
        
        // const courses = await this.courseModel.find({isListed:true}).sort({createdAt:-1}).populate("instructorId")
        const courses = await this.courseModel.find(
            queryData
        ).sort({createdAt:-1}).populate("students").populate("instructorId")
        console.log(courses);
        
       if(courses){
        return courses;
       }
       } catch (error) {
        console.error(error)
       }
    }
    async findById(courseId: string): Promise<ICourse | void> {
       try {
        const course = await this.courseModel.findById({_id:courseId}).populate("instructorId").populate("students").populate("sections")
        if(course){
            return course
        }
       } catch (error) {
        console.error(error)
       }
    }
    
}