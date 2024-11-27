import { NextFunction, Request, Response } from "express";
import { IInstructorUseCase } from "../useCases/interfaces/useCases/IInstructorUseCase";
import { CourseCreatedPublisher } from "../framWorks/webServer/config/kafka/producer/course-created-publisher";
import { Producer } from "kafkajs";
import kafkaWrapper from "../framWorks/webServer/config/kafka/kafkaWrapper";

export class InstructorController{
    // instructorUseCases:IInstructorUseCase
    constructor(private instructorUseCases:IInstructorUseCase){
        // this.instructorUseCases=instructorUseCases
    }
    async createCourse(req:Request,res:Response,next:NextFunction){
      
        const course = await this.instructorUseCases.createCourse({bodyData:req.body,fileData:req.files})
        if(course){    
            console.log(course.sessions);
            await new CourseCreatedPublisher(kafkaWrapper.producer as Producer).produce({
                _id: course._id!,
                title: course.title,
                price: course.price,
                isListed: course.isListed,
                thumbnail: course.thumbnail,
                description: course.description,
                instructorId: course.instructorId!,
                category: course.category,
                subCategory: course.subCategory,
                level: course.level,
                image: course.image,
                sessions: course.sessions,
                createdAt: course.createdAt,
                subscription: course.subscription
            })
            
            res.send({success:true,course:course}) ;
        }
    }
    async editCourse(req:Request,res:Response,next:NextFunction){
        const files = req.files  as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const course = await this.instructorUseCases.editCourse({bodyData:req.body,fileData:req.files as { [fieldname: string]: Express.Multer.File[] } | undefined},next)
        if(course){         
            console.log("im ciontroller");
            return res.send({success:true,course:course}) ;
        }
    }
    async getCourses(req:Request,res:Response,next:NextFunction){
        const {instructorId} = req.params;
        const courses = await this.instructorUseCases.fetchCourses(instructorId)
         if(courses){
             res.send({success:true,courses:courses})
        }
    }
    async allCourses(req:Request,res:Response,next:NextFunction){
       
        const courses = await this.instructorUseCases.allCourses(next)
         if(courses){
             res.send({success:true,courses:courses})
        }
    }
    async listCourse(req:Request,res:Response,next:NextFunction){
       const {courseId} = req.params;
      const course =  await this.instructorUseCases.listCourse(courseId,next)
      if(course){
        return res.send({success:true,course:course});
      }
    }
}