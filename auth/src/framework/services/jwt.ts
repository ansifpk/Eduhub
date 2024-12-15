import { Iuser } from "../../entities/user";
import { IJwt } from "../../useCase/interface/serviceInterface/IJwt";
import jwt,{JwtPayload} from 'jsonwebtoken';

export class JWTtocken implements IJwt{
    async frogetPassword(id: string): Promise<string> {
        const payload  = {id}
        const forgetToken = await jwt.sign(payload,"itsjwtForgetkey",{
            expiresIn:'1d'
        })
        return forgetToken;
    }
    
    async createVerificationJwt(payload: any): Promise<string> {
        const verifyToken = await jwt.sign(payload,"itsjwtverificationkey",{
            expiresIn:'1d'
        })
        return verifyToken;
    }
    async createAccessAndRefreashToken(id: string): Promise<object> {
        console.log("hello");
        
        const payload = {id}
        const accessToken = await jwt.sign(payload ,'itsjwtaccesskey')
         const refreshToken = await jwt.sign(payload,'itsjwtrefreshkey',{
            expiresIn:'3d',
          })
          return {accessToken,refreshToken}
    }
    async verifyJwt(token: string): Promise<any> {
        try{

        
            const data = await jwt.verify(token,'itsjwtverificationkey')
            return data
           }catch(error:any){
               console.log(error.message) 
           }
    }
    
}
