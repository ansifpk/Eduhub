

import { NextFunction } from "express";
import { IOrder } from "../../entities/order";
import { ICourse } from "../../entities/types/course";
import { IInstructorUseCase } from "../interfaces/useCases/IInstrctorUseCase";



export class InstructorUseCase implements IInstructorUseCase{
    constructor(
        private instructorRepository:IInstructorUseCase
    ){}
   async orders(): Promise<IOrder[] | void> {
       const course = await this.instructorRepository.orders();
       return course;
    }
  
}