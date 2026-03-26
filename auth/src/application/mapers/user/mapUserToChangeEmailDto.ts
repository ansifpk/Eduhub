import { Iuser } from "../../../domain/entities/user";
import { IChangeEmailResponseDto } from "../../dtos/user/ChangeEmailResponseDto";



export const mapUserToChangeEmailDto = (user: Iuser): IChangeEmailResponseDto => {
  return {
    email: user.email,
  };
};