import { NextFunction, Request, Response } from "express";
import { InstructorUseCase } from "../useCases/useCases/instructorUseCase";

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

  async ratings(req: Request, res: Response, next: NextFunction) {
     const {userId} = req.params;
     const ratings = await this.instructorUseCases.ratings(userId,next)
    if (ratings) {
      return res.send({ success: true ,ratings});
    }
  }
}
