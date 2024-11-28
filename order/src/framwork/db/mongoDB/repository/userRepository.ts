import { IOrder } from "../../../../entities/order";
import { ICourse } from "../../../../entities/types/course";
import { IUserRepository } from "../../../../useCases/interfaces/repository/IUserRepositoru";
import { courseModel } from "../models/courseMode";
import { OrderModel } from "../models/orderModel";


export class UserRepository implements IUserRepository{
    constructor(
        private orderMedels:typeof OrderModel,
        private courseModels:typeof courseModel
    ){}

  async findById(courseId: string): Promise<ICourse | void> {
     try {
      const course = await this.courseModels.findById({_id:courseId});
      if (course) {
        return course as unknown as ICourse;
      }
     } catch (error) {
      console.error(error)
     }
    throw new Error("Method not implemented.");
  }

  async findAllCurses(userId: string): Promise<ICourse[] | void> {
    const course = await this.courseModels.find({});
    if(course){
      // return course ;
    }
    // return course
    // const userCourses = await courseModel.find({ 
    //   isListed: true 
    // })
    // .populate('users') 

    // if(userCourses){
    //   return userCourses
    // }

  }

    async create(data: ICourse): Promise<IOrder | void> {
      
      const course = await this.orderMedels.create({user:data.user,product:data})
    //   console.log(data._id,"data");
      
      if(course){
        let check = await this.courseModels.findByIdAndUpdate(
            { _id: data._id }, 
            { $push: { students: data.user.id } },
            { new: true } // This returns the updated document
          )
        
        //   console.log(check,"che");
          
        return course
    }
   
     
    //  return course
    }
    
}