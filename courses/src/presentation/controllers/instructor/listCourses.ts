import { CourseListedPublisher, IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { ListCourse } from "../../../application/instructor/listCourse";
import kafkaWrapper from "../../../insfrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

export class ListCourseController implements IController {
  constructor(private readonly _useCase: ListCourse) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const course = await this._useCase.execute({courseId, next});
      if (course) {
        await new CourseListedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: course._id!,
          isListed: course.isListed,
        });
        res.send({ success: true, course: course });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
