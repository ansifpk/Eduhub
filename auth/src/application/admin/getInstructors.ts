import { NextFunction } from "express";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { IUseCase } from "../../shared/IUseCase";
import { Iuser } from "../../domain/entities/user";

export class GetInstructors implements IUseCase<{next:NextFunction},Iuser[]|void> {
    constructor(private readonly adminRepository:AdminRepository) {
        
    }
    public async execute(input: {next:NextFunction}): Promise<Iuser[]|void> {
        try {
            const users = await this.adminRepository.find()
            if(users){
               const instructors = users.filter((value:Iuser) => value.isInstructor == true);
               return instructors;
            }
        } catch (error) {
            console.error(error);
            input.next(error)
        }
    }
}