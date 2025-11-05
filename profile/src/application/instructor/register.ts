import {
  BadRequestError,
  ErrorMessages,
  ForbiddenError,
  IUseCase,
} from "@eduhublearning/common";
import { InstructorRepository } from "../../infrastructure/db/repository/instructorRepostory";
import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";
import CloudinaryV2 from "../../infrastructure/service/cloudinery";

export class Register implements IUseCase<any, Iuser | void> {
  constructor(
    private readonly instructorRepository: InstructorRepository,
    private readonly cloudinary: CloudinaryV2
  ) {}
  public async execute(input: {
    userData: Iuser;
    fileData: {
      certificateImage?: Express.Multer.File[];
      cvImage?: Express.Multer.File[];
    };
    next: NextFunction;
  }): Promise<Iuser | void> {
    try {
      const user = await this.instructorRepository.findByEmail(
        input.userData.email
      );
      if (!user) {
        throw new BadRequestError(ErrorMessages.USER_NOT_FOUND);
      }
      if (user.isBlock) {
        throw new ForbiddenError();
      }
      if (user.isInstructor) {
        throw new BadRequestError(ErrorMessages.INSTRUCTOR_CONFILICT);
      }
      if (user.status == "pending") {
        throw new BadRequestError(ErrorMessages.INSTRUTCOR_PRNDING_REQUEST);
      }

      const certificate = await this.cloudinary.addFile(
        input.fileData.certificateImage![0]
      );
      const cv = await this.cloudinary.addFile(input.fileData.cvImage![0]);
      if (certificate && cv) {
        input.userData.certificate = {
          id: certificate.public_id,
          certificate_url: certificate.secure_url,
        };
        input.userData.cv = {
          id: cv.public_id,
          cv_url: cv.secure_url,
        };
        input.userData.isInstructor = true;

        const updatedUser = await this.instructorRepository.update({
          email: input.userData.email,
          certificate: input.userData.certificate,
          cv: input.userData.cv,
          qualification: input.userData.qualification!,
          experience: input.userData.experience!,
        });

        if (updatedUser) {
          return updatedUser;
        }
      }
    } catch (error) {
      input.next(error);
    }
  }
}
