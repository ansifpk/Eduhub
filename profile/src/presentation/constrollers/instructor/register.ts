import { IController } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { Register } from "../../../application/instructor/register";

export class RegisterController implements IController {
  constructor(private readonly _useCase: Register) {}
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let files = req.files as {
        certificateImage?: Express.Multer.File[];
        cvImage?: Express.Multer.File[];
      };
    //    register(
    //   { bodyData: req.body, fileData: files },
    //   next
    // )
      const updatedUser = await this._useCase.execute({
        userData: req.body,
        fileData: files,
        next,
      });
      if (updatedUser) {
        res.send({ success: true });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
