import { NextFunction } from "express";
import { Iuser } from "../../domain/entities/user";
import { AdminRepository } from "../../infrastructure/db/repository/adminRepository";
import { IUseCase } from "../../shared/IUseCase";

export class AdminGetStudents implements IUseCase<{next:NextFunction},Iuser[]| void> {
    constructor(private readonly adminRepository:AdminRepository) {
        
    }
    public async execute(input: {next:NextFunction}): Promise<void | Iuser[]> {
        try {
            const users = await this.adminRepository.find();
            return users;
        } catch (error) {
            console.error(error);
            input.next(error);
        }
    }
   
}