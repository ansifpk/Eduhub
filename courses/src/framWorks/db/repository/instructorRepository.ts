import { ICourse } from "../../../entities/course";
import { IInstructorrepository } from "../../../useCases/interfaces/repository/IInstructorRepository";
import { Course } from "../mongodb/models/courseModel";

interface Course{
    _id?:string,
    title:string,
    instructorId?:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    isListed:boolean,
    price:number,
    test?:[];
    subscription:boolean,
    videos:string[],
    image:string,
    imageUrl?:string,
    videoUrl?:string[],
    createdAt:string,
}
export class InstructorRepository implements IInstructorrepository{
    constructor(private courseModel:typeof Course){}

    async get(): Promise<ICourse[] | void> {
      try {
        const course = await this.courseModel.find().sort({createdAt:-1})
        if(course){
            return course;
        }
      } catch (error) {
        console.error(error);
      }
    }

    async find(instructorId: string): Promise<ICourse[] | void> {
       try {
        const course = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1})
       if(course){
           return course;
       }
       } catch (error) {
        console.error(error)
       }
    }
    async findById(courseId: string): Promise<ICourse | void> {
        throw new Error("Method not implemented.");
    }
    async create(courseData: ICourse): Promise<ICourse | void> {
        try {
            const course = await this.courseModel.create(courseData);
            if(course){
                return course;
            }
        } catch (error) {
            console.error(error)
        }
    }
    async list(course: ICourse): Promise<ICourse | void> {
        try {
            
        } catch (error) {
            console.error(error)
        }
        throw new Error("Method not implemented.");
    }
    async edit(courseData: ICourse): Promise<ICourse | void> {
        try {
            
        } catch (error) {
            console.error(error)
        }
        throw new Error("Method not implemented.");
    }

//     async findById(courseId: string): Promise<ICourse | void> {
//         const course = await this.courseModel.findById({_id:courseId});
//         if(course){
//           return course; 
//         }
//     }
    
//    async find(instructorId:string): Promise<Course[]| void> {
//         const data = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1});
//         if(data){
//             return data;
//         }
//     }

//     async create(courseData: ICourse): Promise<Course | void> {
//         const data = await this.courseModel.create(courseData) as ICourse
//         if(data){
//             return data;
//         }
//     }

//    async  list(course: ICourse): Promise<ICourse | void> {
//         const updatedCourse = await this.courseModel.findByIdAndUpdate({_id:course._id},{$set:{isListed:!course.isListed}},{new:true});
//         if(updatedCourse){
//             return updatedCourse
//         }
//     }

//     async edit(courseData: ICourse): Promise<ICourse | void> {
//         const course = await this.courseModel.findByIdAndUpdate({_id:courseData._id},{$set:{title:courseData.title,thumbnail:courseData.thumbnail,description:courseData.description,category:courseData.category,subCategory:courseData.subCategory,level:courseData.level,price:courseData.price,image:courseData.image,videos:courseData.videos}},{new:true})
//         if(course){
//             return course;
//         }
//     }

}