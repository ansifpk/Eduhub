import { ICourse } from "../../../entities/course";
import { IUserRepository } from "../../../useCases/interfaces/repository/IUserRepository";
import { Course } from "../mongodb/models/courseModel";

// interface Course{
//     _id?:string,
//     title:string,
//     instructorId?:string,
//     subCategory:string,
//     description:string,
//     thumbnail:string,
//     category:string,
//     level:string,
//     isListed:boolean,
//     price:number,
//     test?:[];
//     subscription:boolean,
//     videos:string[],
//     image:string,
//     imageUrl?:string,
//     videoUrl?:string[],
//     createdAt:string,
// }


export class UserRepository implements IUserRepository{

    constructor(private courseModel:typeof Course){}

    async findWithCondition(userId: string): Promise<ICourse[] | void> {
        try {
            
            const courses = await this.courseModel.find({students:userId});
            if(courses){
                return courses
            }
            
        } catch (error) {
            console.error(error)
        }
       
    }

    async find(): Promise<ICourse[] | void> {
       try {
        const courses = await this.courseModel.find({isListed:true}).sort({createdAt:-1}).populate("instructorId")
       if(courses){
        return courses;
       }
       } catch (error) {
        console.error(error)
       }
    }
    async findById(courseId: string): Promise<ICourse | void> {
       try {
        const course = await this.courseModel.findById({_id:courseId}).populate("instructorId")
        if(course){
            return course
        }
       } catch (error) {
        console.error(error)
       }
    }
    
}