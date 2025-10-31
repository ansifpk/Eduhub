import { IUseCase } from "@eduhublearning/common";
import { NextFunction } from "express";
import { ReqUp } from "../../domain/interfaces/IReqUp";
import { InstructorRepository } from "../../insfrastructure/db/repositories/instructorRepository";
import CloudinaryV2 from "../../insfrastructure/service/cloudiner";
import { SentEmail } from "../../insfrastructure/service/sentMail";

export class UploadVideo
  implements
    IUseCase<{ sectionData: ReqUp; next: NextFunction }, boolean | void>
{
  constructor(
    private readonly instructorRepository: InstructorRepository,
    private readonly cloudinery: CloudinaryV2,
    private readonly sendMail: SentEmail
  ) {}
  public async execute(input: {
    sectionData: ReqUp;
    next: NextFunction;
  }): Promise<boolean | void> {
    try {
      const { sectionData } = input;
      const files = sectionData.fileData as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      sectionData.bodyData = JSON.parse(
        sectionData.bodyData as unknown as string
      );

      for (let key in files) {
        if (key == "courseVideo") {
          for (let value of files[key]) {
            let sectionIdx = parseInt(value.originalname.slice(7, 8));
            let lectureIdx = parseInt(value.originalname.slice(16, 17));
            const data = await this.cloudinery.addFile(value);
            if (data) {
              sectionData.bodyData.sections[sectionIdx].lectures[
                lectureIdx
              ].content._id = data.public_id;
              sectionData.bodyData.sections[sectionIdx].lectures[
                lectureIdx
              ].content.video_url = data.secure_url;
            }
          }
        }
      }

      const section = await this.instructorRepository.upload(
        sectionData.bodyData
      );
      if (section) {
        const course = await this.instructorRepository.addSecton(
          sectionData.courseId,
          section._id!
        );
        await this.sendMail.sentSuccessMailToVideoUploading(
          "pkansif39@gmail.com",
          "jijiu"
        );
        return true;
      }
    } catch (error) {
      console.error(error);
      input.next(error);
    }
  }
}
