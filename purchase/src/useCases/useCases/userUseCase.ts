import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
// import { ICourse } from "../../entities/course";
import { ICourse } from "../../entities/course";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IUserRepository } from "../interfaces/repository/IUserRepositoru";
import ErrorHandler from "../middlewares/errorHandler";
import { Iuser } from "../../entities/user";



export class UserUseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}

    async fetchOrders(userId:string,next: NextFunction): Promise<ICourse[] | void> {
        
       try {
          const courses = await  this.userRepository.findAllCurses(userId)
          if(courses){
            return courses
          }
       } catch (error) {
        console.error(error)
       }
         
        // throw new Error("Method not implemented.");
    }

   async createOrder(data: {courseId:string,user:Iuser,order:IOrder}, next: NextFunction): Promise<ICourse | void> {
       const {courseId,user,order} = data;
    
       console.log("usecase statrt");
       const course = await this.userRepository.findUser(user.id)
       if(!course){
        return next(new ErrorHandler(400,"user not fount"))
       }
    //      console.log("order");
         
        const courseData = await this.userRepository.create(user.id,courseId,order)
        
        if(courseData){
            console.log("usease end");
            return courseData;
        }
        
    }
    
}