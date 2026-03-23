import { Iuser } from "../../domain/entities/user";
import { IGetStudents } from "../../domain/interfaces/admin/useCases/IGetStudents";
import { IAdminRepository } from "../../domain/interfaces/admin/repositories/IAdminRepository";

export class AdminGetStudents implements IGetStudents {
    constructor(private readonly adminRepository:IAdminRepository) {
        
    }
    public async execute(): Promise<void | Iuser[]> {
        try {
            const users = await this.adminRepository.find();
            return users;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
   
}