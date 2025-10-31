import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import CloudinaryV2 from "../../insfrastructure/service/cloudiner";
import { Req } from "../../domain/interfaces/IReq";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { ICourse } from "../../domain/entities/course";

export class CreateCourse
  implements IUseCase<{courseData: Req,next:NextFunction
      }, ICourse | void>
{
  constructor(
    private readonly instructorRepository: InstructorRepository,
    private readonly cloudinery: CloudinaryV2
  ) {}
  public async execute(input: {courseData: Req,next:NextFunction
      }): Promise<ICourse | void> {
    try {
      const { courseData } = input;
      const files = courseData.fileData as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      if (files) {
        for (let key in files) {
          if (key == "courseImage") {
            const data = await this.cloudinery.addFile(files[key][0]);
            if (data) {
              courseData.bodyData.image = {
                _id: data.public_id,
                image_url: data.secure_url,
              };
            }
          }
        }
        //! Adding 10% extra to the instrecture provided amound
        courseData.bodyData.price = courseData.bodyData.price * 1;
        let adminPrice = Math.floor((courseData.bodyData.price * 10) / 100);
        courseData.bodyData.price = courseData.bodyData.price + adminPrice;
        const course = await this.instructorRepository.create(
          courseData.bodyData
        );
        if (course) {
          return course;
        }
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
