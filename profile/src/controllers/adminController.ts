import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCasesInterfaces/IadminUseCase";
import { InstructorAprovalPublisher } from "../framwork/webServer/config/kafka/producers/instructor-aprovel-publisher";
import kafkaWrapper from "../framwork/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class AdminController{
    constructor(private adminUseCase:IAdminUseCase){}
    async fetchInstructors(req:Request,res:Response,next:NextFunction){
      try {
        const { search,sort } = req.query
       
       const instructors =  await this.adminUseCase.fetchInstructors(search as string, sort as string,next)
       if(instructors){
        return res.send(instructors)
       }
      } catch (error) {
        console.error(error)
      }
    }

    async fetchStudents(req:Request,res:Response,next:NextFunction){
        try {
        const { search,sort } = req.query
        console.log(sort,"cinj");
        
        const students = await this.adminUseCase.fetchStudents(search as string,sort as string,next)
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
            
            if(students){
         
            await new InstructorAprovalPublisher(kafkaWrapper.producer as Producer).produce({
              _id: students._id,
              isInstructor: students.isInstructor
            })
            return res.send(students)
          }

          } catch (error) {
            console.error(error)
          }
    }

   
    async top5Instructors(req:Request,res:Response,next:NextFunction){
      try {

         const users = await this.adminUseCase.top5Instructors()
       if(users){
           res.send(users);
         }
       
      } catch (error) {
       console.error(error)
      }
   }

}