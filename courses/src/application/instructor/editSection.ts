import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { ReqUp } from "../../domain/interfaces/IReqUp";
import { IInstructorRepository } from "../../domain/interfaces/repository/IInstructorRepository";
import { ICloudinary } from "../../domain/interfaces/service/Icloudinery";
import { IEditSection } from "../../domain/interfaces/instructor/IEditSection";

export class EditSection
  implements IEditSection{
  constructor(
    private readonly instructorRepository: IInstructorRepository,
    private readonly cloudinery: ICloudinary
  ) {}
  public async execute(input: {
    sectionData: ReqUp;
  }): Promise< boolean | void> {
    try {
      const { sectionData } = input;
      const files = sectionData.fileData as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      const course = await this.instructorRepository.findById(
        sectionData.courseId
      );
      if (!course) {
        throw new BadRequestError(ErrorMessages.COURSE_NOT_FOUND);
      }

      sectionData.bodyData = JSON.parse(
        sectionData.bodyData as unknown as string
      );

      if (files) {
        for (let key in files) {
          if (key == "courseVideo") {
            for (let i = 0; i < files[key].length; i++) {
              let sectionIdx = parseInt(files[key][i].originalname.slice(7, 8));
              let lectureIdx = parseInt(
                files[key][i].originalname.slice(16, 17)
              );
              if (!isNaN(sectionIdx) && !isNaN(lectureIdx)) {
                const data = await this.cloudinery.addFile(files[key][i]);
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
        }
      }
      const section = await this.instructorRepository.editSecton(
        course?.sections?._id!,
        sectionData.bodyData
      );
      await this.instructorRepository.addSecton(
        sectionData.courseId,
        section?._id!
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
