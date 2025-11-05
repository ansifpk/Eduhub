import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import { NextFunction } from "express";
import { Req } from "../../domain/interfaces/IReq";
import { ICourse } from "../../domain/entities/course";
import CloudinaryV2 from "../../insfrastructure/service/cloudiner";

export class EditCourse
  implements
    IUseCase<
      { courseId: string; courseData: Req; next: NextFunction },
      ICourse | void
    >
{
  constructor(
    private readonly instructorRepository: InstructorRepository,
    private readonly cloudinary: CloudinaryV2
  ) {}
  public async execute(input: {
    courseId: string;
    courseData: Req;
    next: NextFunction;
  }): Promise<ICourse | void> {
    try {
      const { courseId, courseData } = input;
      const checkCourse = await this.instructorRepository.findByIdWthPopulate(
        courseId
      );
      if (!checkCourse) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }
      courseData.bodyData.image = checkCourse.image;

      const files = courseData.fileData as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      if (files) {
        for (let key in files) {
          if (key == "courseImage") {
            const data = await this.cloudinary.addFile(files[key][0]);
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
        courseData.bodyData._id = courseId;

        const course = await this.instructorRepository.edit(
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
