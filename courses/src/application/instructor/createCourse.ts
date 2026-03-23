import { Req } from "../../domain/interfaces/IReq";
import { ICourse } from "../../domain/entities/course";
import { ICreateCourse } from "../../domain/interfaces/instructor/ICreateCourse";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";
import { ICloudinary } from "../../domain/interfaces/service/Icloudinery";

export class CreateCourse
  implements ICreateCourse{
  constructor(
    private readonly instructorRepository: IInstructorRepository,
    private readonly cloudinery: ICloudinary
  ) {}
  public async execute(input: {courseData: Req}): Promise<ICourse | void> {
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
      throw error;
    }
  }
}
