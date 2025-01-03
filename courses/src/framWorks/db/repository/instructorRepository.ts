import { ICourse } from "../../../entities/course";
import { ISection } from "../../../entities/section";
import { ITest } from "../../../entities/test";
import { IInstructorrepository } from "../../../useCases/interfaces/repository/IInstructorRepository";
import { Course } from "../mongodb/models/courseModel";
import { SectionModel } from "../mongodb/models/sectionModel";
import { testModel } from "../mongodb/models/testModel";

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
    constructor(
        private courseModel:typeof Course,
        private sectionModel:typeof SectionModel,
        private testModels:typeof testModel,
    ){}
   async findTest(testId: string): Promise<ITest | void> {
       try {
           const test = await this.testModels.findById({_id:testId});
           if(test){
            return test;
           }
       } catch (error) {
        console.error(error)
       }
    }
   async editTest(testId: string, testData: ITest): Promise<ITest | void> {
       try {
        
        const testUpdated = await this.testModels.findByIdAndUpdate({_id:testId},{$set:{test:testData}},{new:true});
        if(testUpdated){
         return testUpdated;
        }
       } catch (error) {
        console.error(error)
       }
    }
    async addTest(courseId: string, testId: string): Promise<ICourse | void> {
       try {
          const course = await this.courseModel.findByIdAndUpdate({_id:courseId},{$set:{test:testId}},{new:true})
          if(course){
            return course;
          }
        } catch (error) {
        console.error(error)
       }
    }

   async creatTest(testData: ITest): Promise<ITest | void> {
        try {
           const test = await this.testModels.create({
              test:testData
           })
           if(test){            
            return test
           }
        } catch (error) {
            console.error(error)
        }
    }

    async addSecton(courseId: string, sectionId: string): Promise<ICourse | void> {
       try {
       
             
          const course = await this.courseModel.findOneAndUpdate({_id:courseId},{$push:{sections:sectionId}},{new:true})
          if(course){
    
              return course
          }
          
       } catch (error) {
        console.error(error)
       }
    }
    async editSecton(sectionData:ISection): Promise<ISection | void> {
       try {
          
           const section = await this.sectionModel.findOneAndUpdate({_id:sectionData._id},{$set:{sectionTitle:sectionData.sectionTitle,lectures:sectionData.lectures}})
           if(section){
            return section
           }
        } catch (error) {
        console.error(error)
       }
    }
    async upload(sectionData: ISection): Promise<ISection | void> {
        try {
            const course = await this.sectionModel.create(sectionData);
            if(course){
                return course;
            }
        } catch (error) {
            console.error(error)
        }
    }
  
    async get(): Promise<ICourse[] | void> {
      try {
        const course = await this.courseModel.find().sort({createdAt:-1}).populate("sections")
        if(course){
            return course;
        }
      } catch (error) {
        console.error(error);
      }
    }

    async find(instructorId: string,search:string,sort:string): Promise<ICourse[] | void> {
       try {
        let sortQuery:any = {}
        let queryData:any = {instructorId:instructorId}
        switch (sort) {
            case "All":
              sortQuery.createdAt = -1
              break;
            case "Name A-Z":
              sortQuery.name = 1
              break;
            case "Name Z-A":
              sortQuery.name = -1
              break;
            case "Old":
              sortQuery.createdAt = 1
              break;
            case "New":
                sortQuery.createdAt = -1
                break;
            default:
                sortQuery.createdAt = -1
                break;
          }
          if(search){
             queryData = {
                instructorId:instructorId,
                students: {
                  $elemMatch: {
                    name: { $regex: 's', $options: 'i' }
                  }
                }
              };
          }
        // console.log(sortQuery,queryData.students);
        // const course = await this.courseModel.find(queryData).sort(sortQuery).populate("sections").populate("instructorId").populate("students").populate("test")
        const course = await this.courseModel.find({instructorId:instructorId}).sort({createdAt:-1}).populate("sections").populate("instructorId").populate("students").populate("test")
       if(course){
           return course;
       }
       } catch (error) {
        console.error(error)
       }
    }
    async findById(courseId: string): Promise<ICourse | void> {
        try {
            const course = await this.courseModel.findById({_id:courseId}).populate("instructorId").populate("students")
            if(course){
                return course;
            }
        } catch (error) {
            console.error(error)
        }
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
   
    async list(courseId:string,isListed:boolean): Promise<ICourse | void> {
        try {
            const course =  await this.courseModel.findByIdAndUpdate({_id:courseId},{$set:{isListed:!isListed}},{new:true})
            if(course){
                return course;
            }
        } catch (error) {
            console.error(error)
        }

    }
    async edit(courseData: ICourse): Promise<ICourse | void> {
        try {
            const {title,category,subCategory,level,thumbnail,description,price,image} = courseData;

            const course = await this.courseModel.findByIdAndUpdate({_id:courseData._id},{$set:{title,category,subCategory,level,thumbnail,description,price,image}},{new:true})
            if(course){
                return course
            }
        } catch (error) {
            console.error(error)
        }
      
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