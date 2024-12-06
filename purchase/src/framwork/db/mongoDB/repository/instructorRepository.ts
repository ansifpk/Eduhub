import { IOrder } from "../../../../entities/order";
import { IInstructorRepository } from "../../../../useCases/interfaces/repository/IInstructorRepository";
import { OrderModel } from "../models/orderModel";

export class InstructorRepository implements IInstructorRepository{
    constructor(
        private orderMedels:typeof OrderModel
    ){}
    async orders(): Promise<IOrder[]| void> {
     const course = await this.orderMedels.find().sort({orderDate:-1})
     return course
    }
    
}