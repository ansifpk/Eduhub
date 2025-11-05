import {
  IController,
  InstructorAprovalPublisher,
  StatusCodes,
} from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { InstructorAprovel } from "../../../application/admin/instructorAprovel";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";

export class InstructorAprovelController implements IController {
  constructor(private readonly _useCase: InstructorAprovel) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, status } = req.body;
      const students = await this._useCase.execute({ email, status, next });

      if (students) {
        await new InstructorAprovalPublisher(
          kafkaWrapper.producer as Producer
        ).produce({
          _id: students._id,
          isInstructor: students.isInstructor,
        });
        res.status(StatusCodes.OK).send(students);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
