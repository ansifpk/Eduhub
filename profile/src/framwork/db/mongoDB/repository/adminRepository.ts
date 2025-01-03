import { Iuser } from "../../../../entities/user";
import { IAdminRepository } from "../../../../useCases/interfaces/repositoryInterfaces/IadminRepository";
import { userModel } from "../models/userModel";

export class AdminRepository implements IAdminRepository{
   
    constructor(private userModels:typeof userModel){}
    async find(search:string,sort:string): Promise<Iuser[] | void> {
        try {

            let queryData:any = {}
            let sortQuery:any = {}
                
                switch (sort) {
                    case "All":
                      sortQuery.createdAt = -1
                      break;
                    case "Name Aa-Zz":
                      sortQuery.name = 1
                      break;
                    case "Name Zz-Aa":
                      sortQuery.name = -1
                      break;
                    case "Old":
                      sortQuery.createdAt = 1
                      break;
                    case "New":
                        sortQuery.createdAt = -1
                        break;
                    default:
                        sortQuery.createdAt = -1
                        break;
                  }
            
                  if(search){
                    queryData.name = {$regex:search,$options: "i"}
                  }
            const students = await this.userModels.find(queryData).sort(sortQuery)
            if(students){
              return students;
            }
        } catch (error) {
            console.error(error)
        }
    }

    async findByEmail(email: string): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findOne({email:email})
        if(user){
            return user
        }
       } catch (error) {
        console.error(error)
       }

    }
    async approveIntructor(email: string, status: string,instructor:boolean): Promise<Iuser | void> {
       try {
        const user = await this.userModels.findOneAndUpdate({email:email},{$set:{status:status,isInstructor:instructor}},{new:true})
        if(user){
            console.log(user.isInstructor,user.status);
            
           return user;
        }
       } catch (error) {
        console.error(error)
       }
    }

    async findInstructors(search:string,sort:string): Promise<Iuser[] | void> {
        try {
            let queryData:any = {isAdmin:false,$or:[{status:'pending'},{status:"Approved"}]}
            let sortQuery:any = {}
                
                switch (sort) {
                    case "All":
                      sortQuery.createdAt = -1
                      break;
                    case "Name Aa-Zz":
                      sortQuery.name = 1
                      break;
                    case "Name Zz-Aa":
                      sortQuery.name = -1
                      break;
                    case "Old":
                      sortQuery.createdAt = 1
                      break;
                    case "New":
                        sortQuery.createdAt = -1
                        break;
                    default:
                        sortQuery.createdAt = -1
                        break;
                  }
            
                  if(search){
                    queryData.name = {$regex:search,$options: "i"}
                  }
             const users = await this.userModels.find(queryData).sort(sortQuery)
             if(users){
                return users;
             }
        } catch (error) {
            console.error(error)
        }
    }

}