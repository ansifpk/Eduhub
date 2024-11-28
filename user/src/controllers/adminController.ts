import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCasesInterfaces/IadminUseCase";
import { instructorAprovalPublisher } from "../framwork/webServer/config/kafka/producers/instructor-aprovel-publisher";
import kafkaWrapper from "../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class AdminController{
    constructor(private adminUseCase:IAdminUseCase){}

    async fetchInstructors(req:Request,res:Response,next:NextFunction){
      try {
       const instructors =  await this.adminUseCase.fetchInstructors(next)
       if(instructors){
        return res.send(instructors)
       }
      } catch (error) {
        console.error(error)
      }
    }

    async fetchStudents(req:Request,res:Response,next:NextFunction){
        try {
            
        const students = await this.adminUseCase.fetchStudents(next)
       if(students){
        return res.send(students)
       }
          } catch (error) {
            console.error(error)
          }
    }


    async instructorAprovel(req:Request,res:Response,next:NextFunction){
        try {
           const {email,status} = req.body
            const students = await this.adminUseCase.instructorAprovel(email,status,next)
            console.log(students,"ji");
            
            if(students){
            await new instructorAprovalPublisher(kafkaWrapper.producer as Producer).produce({
              _id: students._id,
              name: students.name,
              email: students.email,
              status: students.status,
              isInstructor: students.isInstructor
            })
            return res.send(students)
          }

          } catch (error) {
            console.error(error)
          }
    }
}