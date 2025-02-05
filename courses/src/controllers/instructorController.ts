import { NextFunction, Request, Response } from "express";
import { IInstructorUseCase } from "../useCases/interfaces/useCases/IInstructorUseCase";
import { Producer } from "kafkajs";
import kafkaWrapper from "../framWorks/webServer/config/kafka/kafkaWrapper";
import { CourseCreatedPublisher, CourseListedPublisher, CourseUpdatedPublisher } from "@eduhublearning/common";

export class InstructorController{
   
    constructor(private instructorUseCases:IInstructorUseCase){
        
    }
    async createCourse(req:Request,res:Response,next:NextFunction){
   
        
        const course = await this.instructorUseCases.createCourse({bodyData:req.body,fileData:req.files},next)
        if(course){    
           
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
                sections: course.sections,
                createdAt: course.createdAt,
                subscription: course.subscription
            })
            
            res.send({success:true,course:course}) ;
            
           
            await this.instructorUseCases.uploadVideo({courseId:course._id,bodyData:req.body.sectionsVideos,fileData:req.files},next)
          
        }
    }
 
    async editCourse(req:Request,res:Response,next:NextFunction){
        const files = req.files  as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const course = await this.instructorUseCases.editCourse({bodyData:req.body,fileData:req.files as { [fieldname: string]: Express.Multer.File[] } | undefined},next)
        if(course){         
       
          
            res.send({success:true,course:course}) ;
            await new CourseUpdatedPublisher(kafkaWrapper.producer as Producer).produce({
                _id: course._id!,
                title: course.title,
                category: course.category,
                subCategory: course.subCategory,
                level: course.level,
                thumbnail: course.thumbnail,
                description: course.description,
                price: course.price,
                image: course.image,
                sections: course.sections
            })
            await this.instructorUseCases.editSection({courseId:req.body._id,bodyData:req.body.sections,fileData:files},next)
            
        }
    }
    async getCourses(req:Request,res:Response,next:NextFunction){
        const {instructorId,search,sort,page} = req.query;
        const courses = await this.instructorUseCases.fetchCourses(instructorId as string,search as string,sort as string)
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
        await new CourseListedPublisher(kafkaWrapper.producer as Producer).produce({
            _id: course._id!,
            isListed: course.isListed
        })
        return res.send({success:true,course:course});
      }
    }

    async addTest(req:Request,res:Response,next:NextFunction){
          const {testData} = req.body;
          const {courseId} = req.params;
      const course =  await this.instructorUseCases.addTest(courseId,testData,next)
      if(course){
        return res.send({success:true});
      }
    }

    async editTest(req:Request,res:Response,next:NextFunction){
          const {testData} = req.body;
          const {testId} = req.params;
          
      const course =  await this.instructorUseCases.editTest(testId,testData,next)
      if(course){
        return res.send({success:true});
      }
    }

    async top5Courses(req:Request,res:Response,next:NextFunction){
          const {userId} = req.params;
          const courses =  await this.instructorUseCases.top5Courses(userId,next)
      if(courses){
        return res.send({success:true,courses});
      }
    }

    async topRated(req:Request,res:Response,next:NextFunction){
          const {userId} = req.params;
          const courses =  await this.instructorUseCases.topRated(userId,next)
      if(courses){
        return res.send({success:true,courses});
      }
    }

   
}