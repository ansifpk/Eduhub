import { IController, StatusCodes } from "@eduhublearning/common";
import { Request, Response, NextFunction } from "express";
import { IRegister } from "../../../domain/interfaces/useCases/instructor/IRegister";

export class RegisterController implements IController {
  constructor(private readonly _useCase: IRegister) {}
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

      const updatedUser = await this._useCase.execute({
        userData: req.body,
        fileData: files,
      });
      if (updatedUser) {
        res.status(StatusCodes.CREATED).send({ success: true });
      }
    } catch (error) {
      next(error);
    }
  }
}
