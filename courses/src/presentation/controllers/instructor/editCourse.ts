import { CourseUpdatedPublisher, IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import kafkaWrapper from "../../../insfrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { IEditCourse } from "../../../domain/interfaces/instructor/IEditCourse";
import { IEditSection } from "../../../domain/interfaces/instructor/IEditSection";

export class EditCourseController implements IController {
  constructor(
    private readonly _courseUseCase: IEditCourse,
    private readonly _sectionUseCase: IEditSection,
) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const course = await this._courseUseCase.execute({
        courseId,
        courseData: { bodyData: req.body, fileData: files },
      });
      if (course) {
        await new CourseUpdatedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: course._id!,
          title: course.title,
          category: course.category,
          subCategory: course.subCategory,
          level: course.level,
          thumbnail: course.thumbnail,
          description: course.description,
          price: course.price,
          image: course.image,
        });
        this._sectionUseCase.execute({sectionData:{courseId:courseId,bodyData:req.body.sections,fileData:files}})
        res.status(StatusCodes.OK).send({ success: true, course: course });
      }
    } catch (error) {
      next(error);
    }
  }
}
