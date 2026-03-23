import {
  IController,
  InstructorAprovalPublisher,
  StatusCodes,
} from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Producer } from "kafkajs";
import kafkaWrapper from "../../../infrastructure/kafka/kafkaWrapper";
import { IInstructorAprovel } from "../../../domain/interfaces/useCases/admin/IInstructorAprovel";

export class InstructorAprovelController implements IController {
  constructor(private readonly _useCase: IInstructorAprovel) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, status } = req.body;
      const students = await this._useCase.execute({ email, status });

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
      next(error);
    }
  }
}
