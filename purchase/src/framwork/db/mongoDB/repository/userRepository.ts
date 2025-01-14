import { IOrder } from "../../../../entities/order";
// import { ICourse } from "../../../../entities/types/course";
import { ICourse } from "../../../../entities/course";
import { IUserRepository } from "../../../../useCases/interfaces/repository/IUserRepositoru";
import { courseModel } from "../models/courseMode";
import { OrderModel } from "../models/orderModel";
import { UserModel } from "../models/userMode";
import { Iuser } from "../../../../entities/user";
import { IUserSubscribe } from "../../../../entities/userSubscribe";
import { userSubscriptionModel } from "../models/userSuscriptionModel";
import { userSubscribeModel } from "../models/userSubscribe";
import { ISubcription } from "../../../../entities/subscription";
import { subscriptionModel } from "../models/subscriptionModel";
import { IUserSubcription } from "../../../../entities/userSubscription";


export class UserRepository implements IUserRepository{
    constructor(
        private orderMedels:typeof OrderModel,
        private courseModels:typeof courseModel,
        private userModels:typeof UserModel,
        private subscriptionUserModel:typeof userSubscriptionModel,
        private subscribeModel:typeof userSubscribeModel,
        private subscribtionModel:typeof subscriptionModel,
    ){}

  async subscriptionFindById(subscriptionId: string): Promise<IUserSubcription | void> {
     try {
        const subscription = await this.subscriptionUserModel.findById({_id:subscriptionId})
        if (subscription) {
          return subscription 
        }
       } catch (error) {
        console.error(error)
       }
  }

    async  plans(userId: string): Promise<IUserSubscribe[] | void> {
      try {
        const plans = await this.subscribeModel.find({userId:userId}).populate('subscriptionId')
        if (plans) {
          return plans 
        }
       } catch (error) {
        console.error(error)
       }
      }

    async subscriptions(instructorId: string): Promise<IUserSubcription[] | void> {
      try {
        const subscriptions = await this.subscriptionUserModel.find({instructorId:instructorId})
        if (subscriptions) {
          return subscriptions 
        }
       } catch (error) {
        console.error(error)
       }
      }

    async purchaseSubscription(customerId:string,subscriptionId:string,subscription:string,userId:string): Promise<IUserSubscribe | void> {
      try {
        console.log(customerId,subscriptionId,subscription,userId);
        // const subscriprion = await this.subscribeModel.create({
          
        // })
       } catch (error) {
        console.error(error)
       }
    }

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