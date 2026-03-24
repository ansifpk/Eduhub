import { CourseListedPublisher, IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import kafkaWrapper from "../../../insfrastructure/kafka/kafkaWrapper";
import { Producer } from "kafkajs";
import { IListCourse } from "../../../domain/interfaces/instructor/IIistCourse";

export class ListCourseController implements IController {
  constructor(private readonly _useCase: IListCourse) {}

  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const course = await this._useCase.execute({courseId});
      if (course) {
        await new CourseListedPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: course._id!,
          isListed: course.isListed,
        });
        res.status(StatusCodes.OK).send({ success: true, course: course });
      }
    } catch (error) {
      next(error);
    }
  }
}
