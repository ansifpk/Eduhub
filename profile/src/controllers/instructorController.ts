import { NextFunction, Request, Response } from "express";
import { InstructorUseCase } from "../useCases/useCases/instructorUseCase";
interface CustomRequest extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[]; // Define expected structure for req.files
  };
}
export class InstructorController {
  constructor(private instructorUseCases: InstructorUseCase) {}
  async register(req: Request, res: Response, next: NextFunction) {
    let files = req.files as {
      certificateImage?: Express.Multer.File[];
      cvImage?: Express.Multer.File[];
    };

    const updatedUser = await this.instructorUseCases.register(
      { bodyData: req.body, fileData: files },
      next
    );
    if (updatedUser) {
      return res.send({ success: true });
    }
  }
}
