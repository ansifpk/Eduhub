import { Iuser } from "../../domain/entities/user";
import { LoginUserResponseDto } from "../dtos/LoginUserResponseDto";

export const mapUserToLoginDto = (user: Iuser): LoginUserResponseDto => {
  return {
    id: user._id as string,
    email: user.email,
    name: user.name,
    isBlock: user.isBlock
  };
};