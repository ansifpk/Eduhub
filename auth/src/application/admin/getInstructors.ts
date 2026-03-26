import { Iuser } from "../../domain/entities/user";
import { IGetInstructors } from "../../domain/interfaces/admin/useCases/IGetInstructors";
import { IAdminRepository } from "../../domain/interfaces/admin/repositories/IAdminRepository";

export class GetInstructors implements IGetInstructors {
    constructor(private readonly adminRepository:IAdminRepository) {
        
    }
    public async execute(): Promise<Iuser[]|void> {
        try {
            const users = await this.adminRepository.find()
            if(users){
               const instructors = users.filter((value:Iuser) => value.isInstructor == true);
               return instructors;
            }
        } catch (error) {
            console.error(error);
            throw error  
       }
    }
}