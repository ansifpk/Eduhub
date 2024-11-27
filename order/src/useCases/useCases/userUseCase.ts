import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
import { ICourse } from "../../entities/types/course";
import { IUserUseCase } from "../interfaces/useCases/IUserUseCase";
import { IUserRepository } from "../interfaces/repository/IUserRepositoru";



export class UserUseCase implements IUserUseCase{
    constructor(
        private userRepository:IUserRepository
    ){}

    async fetchOrders(userId:string,next: NextFunction): Promise<ICourse[] | void> {
        
         const courses = await  this.userRepository.findAllCurses(userId)
        // throw new Error("Method not implemented.");
    }

   async createOrder(data: ICourse, next: NextFunction): Promise<IOrder | void> {
    // console.log("contrio");
        const course = await this.userRepository.create(data)
        if(course){
            return course;
        }
        // throw new Error("Method not implemented.");
    }
    
}