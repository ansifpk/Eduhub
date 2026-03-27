import { Iuser } from "../../../domain/entities/user";
import { IChangeEmailResponseDto } from "../../dtos/user/ChangeEmailResponseDto";



export const mapUserToChangeEmailDto = (user: Iuser): IChangeEmailResponseDto => {
  return {
    _id:user._id!,
    email: user.email,
  };
};