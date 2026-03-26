import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { IAdminLogin } from "../../domain/interfaces/admin/useCases/IAdminLogin";
import { IAdminRepository } from "../../domain/interfaces/admin/repositories/IAdminRepository";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";
import { IAdmin } from "../../domain/entities/admin";

export class AdminLogin implements IAdminLogin{
  constructor(
    private readonly _adminRepository: IAdminRepository,
    private readonly _jwt: IJwt,
    private readonly _encrypt: IHashPassword
  ) {}
  public async execute(input: {
    email: string;
    password: string;
  }): Promise<{ token:IToken, admin:IAdmin }| void> {
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
      throw error;
    }
  }
}
