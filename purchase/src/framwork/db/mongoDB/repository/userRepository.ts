import { IOrder } from "../../../../entities/order";
// import { ICourse } from "../../../../entities/types/course";
import { ICourse } from "../../../../entities/course";
import { IUserRepository } from "../../../../useCases/interfaces/repository/IUserRepositoru";
import { courseModel } from "../models/courseMode";
import { OrderModel } from "../models/orderModel";
import { UserModel } from "../models/userMode";
import { Iuser } from "../../../../entities/user";

interface orderData{

}
export class UserRepository implements IUserRepository{
    constructor(
        private orderMedels:typeof OrderModel,
        private courseModels:typeof courseModel,
        private userModels:typeof UserModel,
    ){}

  async findById(courseId: string): Promise<ICourse | void> {
     try {
      const course = await this.courseModels.findById({_id:courseId}).populate("instructorId");
      if (course) {
        return course 
      }
     } catch (error) {
      console.error(error)
     }
    
  }
  async findUser(userId: string): Promise<Iuser | void> {
     try {
      const course = await this.userModels.findById({_id:userId});
      if (course) {
        return course 
      }
     } catch (error) {
      console.error(error)
     }
    
  }

  async findAllCurses(userId: string): Promise<ICourse[] | void> {
    const course = await this.courseModels.find({}).populate("instructorId");
    if(course){
      return course ;
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

    async create(userId:string,course: ICourse): Promise<ICourse | void> {
   try {
    // console.log("repost statrt");
    const order = await this.orderMedels.create({user:userId,course:course})
    
    if(order){
      console.log("repo updte statrt",'courseId',userId,'courseId',course._id);
      let check = await this.courseModels.findByIdAndUpdate(
          { _id: course._id! }, 
          { $addToSet: { students: userId } },
          { new: true } 
        )
        // console.log(check,"ccheck");
        
      if(check){
        // console.log("repo updte end");
        return check
      }
  }

   } catch (error) {
    console.error(error)
   }
    }
    
}