import { NextFunction } from "express";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { IUseCase } from "../../shared/IUseCase";
import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { Encrypt } from "../../infrastructure/services/hashPassword";

export class AdminLogin
  implements
    IUseCase<
      { email: string; password: string; next: NextFunction },
      any | void
    >
{
  constructor(
    private readonly _adminRepository: AdminRepository,
    private readonly _jwt: JWTtocken,
    private readonly _encrypt: Encrypt
  ) {}
  public async execute(input: {
    email: string;
    password: string;
    next: NextFunction;
  }): Promise<any> {
    try {
      const admin = await this._adminRepository.findByEmail(input.email);
      if (admin) {
        const hashPassword = await this._encrypt.comparePassword(
          input.password,
          admin.password
        );
        if (hashPassword) {
          if (admin.isAdmin) {
            const token = (await this._jwt.createAccessAndRefreashToken(
              admin._id!
            )) as IToken;
            return { token, admin };
          } else {
            throw new BadRequestError(ErrorMessages.NOT_ADMIN);
          }
        } else {
          throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS);
        }
      } else {
        throw new BadRequestError(ErrorMessages.INVALID_CREDENCIALS);
      }
    } catch (error) {
      console.log(error);
      input.next(error);
    }
  }
}
