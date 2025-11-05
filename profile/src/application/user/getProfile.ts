import { BadRequestError, ErrorMessages, IUseCase } from "@eduhublearning/common";
import { UserRepository } from "../../infrastructure/db/repository/userRepository";
import { Iuser } from "../../domain/entities/user";
import { NextFunction } from "express";

export class GetProfile implements IUseCase<{userId: string, next: NextFunction},Iuser|void> {
    constructor(private readonly userRepository:UserRepository) {
        
    }
    public async execute(input: {userId: string, next: NextFunction}): Promise<Iuser|void> {
        try {
            const {userId} = input;
              const user = await this.userRepository.findById(userId);
              if(!user){
                throw new BadRequestError(ErrorMessages.USER_NOT_FOUND)
              }
              return user
        
            } catch (error) {
              console.error(error);
              input.next(error)
            }
    }
}