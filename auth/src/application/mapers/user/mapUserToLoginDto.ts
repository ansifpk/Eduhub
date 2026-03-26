import { Iuser } from "../../../domain/entities/user";
import { ILoginUserResponseDto } from "../../dtos/user/LoginUserResponseDto ";


export const mapUserToLoginDto = (user: Iuser): ILoginUserResponseDto => {
  return {
    _id: user._id as string,
    email: user.email,
    name: user.name,
    isBlock: user.isBlock,
    isInstructor:user.isInstructor
  };
};