

import { Iuser } from "../../../domain/entities/user";
import { IBlockUserResponseDto } from "../../dtos/admin/BlockUserResponseDto";

export const mapUserToBlockUserDto = (user: Iuser): IBlockUserResponseDto => {
  return {
    isBlock: user.isBlock!,
  };
};