import { ReqUp } from "../../domain/interfaces/IReqUp";
import { IUploadVideo } from "../../domain/interfaces/instructor/IUploadVideo";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";
import { ICloudinary } from "../../domain/interfaces/service/Icloudinery";
import { ISentEmail } from "../../domain/interfaces/service/ISentMail";

export class UploadVideo
  implements IUploadVideo{
  constructor(
    private readonly instructorRepository: IInstructorRepository,
    private readonly cloudinery: ICloudinary,
    private readonly sendMail: ISentEmail
  ) {}
  public async execute(input: {
    sectionData: ReqUp;
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
      throw error;
    }
  }
}
