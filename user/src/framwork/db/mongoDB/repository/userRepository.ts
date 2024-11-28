import { Iuser } from "../../../../entities/user";
import { IUserRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IuserRepository";
import { userModel } from "../models/userModel";


export class UserRepository implements IUserRepository{
    constructor(
        private userModels:typeof userModel
    ){}
    findById(userId: string): Promise<Iuser | void> {
        throw new Error("Method not implemented.");
    }
    
}