

import { Iuser } from "../../../domain/entities/user";
import { IBlockUserResponseDto } from "../../dtos/admin/BlockUserResponseDto";

export const mapUserToBlockUserDto = (user: Iuser): IBlockUserResponseDto => {
  return {
    _id:user._id!,
    isBlock: user.isBlock!,
  };
};