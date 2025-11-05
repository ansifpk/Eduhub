import { CourseCreatedPublisher, IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../../insfrastructure/kafka/kafkaWrapper";
import { CreateCourse } from "../../../application/instructor/createCourse";
import { UploadVideo } from "../../../application/instructor/uploadVideo";

export class CreateCourseControll implements IController {
    constructor(
        private readonly _courseUseCase:CreateCourse,
        private readonly _uploadVideoUseCase:UploadVideo,
    ) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {

         const files = req.files as { [fieldname: string]: Express.Multer.File[] };
         
         const course = await this._courseUseCase.execute({courseData:{bodyData:req.body,fileData:files},next});
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
                createdAt: course.createdAt,
                subscription: course.subscription
            })

            this._uploadVideoUseCase.execute({sectionData:{courseId:course._id as string,bodyData:req.body.sectionsVideos,fileData:files},next})
            res.status(StatusCodes.CREATED).send({success:true,course:course}) ;
          
        }
    }
}