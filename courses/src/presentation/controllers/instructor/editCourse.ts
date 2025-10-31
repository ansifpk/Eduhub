import { CourseUpdatedPublisher, IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { EditCourse } from "../../../application/instructor/editCourse";
import kafkaWrapper from "../../../insfrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { EditSection } from "../../../application/instructor/editSection";

export class EditCourseController implements IController {
  constructor(
    private readonly _courseUseCase: EditCourse,
    private readonly _sectionUuseCase: EditSection,
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
        next,
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
        this._sectionUuseCase.execute({sectionData:{courseId:courseId,bodyData:req.body.sections,fileData:files},next})
        res.send({ success: true, course: course });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
