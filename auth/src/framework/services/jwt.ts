import { Iuser } from "../../entities/user";
import { IJwt } from "../../useCase/interface/serviceInterface/IJwt";
import jwt,{JwtPayload} from 'jsonwebtoken';

export class JWTtocken implements IJwt{
    async frogetPassword(id: string): Promise<string> {
        const payload  = {id}
        const forgetToken = await jwt.sign(payload,"itsjwtForgetkey",{
            expiresIn:'1m'
        })
        return forgetToken;
    }
    
    async createVerificationJwt(payload: any): Promise<string> {
        const verifyToken = await jwt.sign(payload,"itsjwtverificationkey",{
            expiresIn:'1h'
        })
        return verifyToken;
    }
    async createAccessAndRefreashToken(id: string): Promise<object> {
        console.log("hello");
        
        const payload = {id}
        const accessToken = await jwt.sign(payload ,'itsjwtaccesskey',{
            expiresIn:'5h'
         })
         const refreshToken = await jwt.sign(payload,'itsjwtrefreshkey',{
            expiresIn:'3d',
          })
          return {accessToken,refreshToken}
    }
    async verifyJwt(token: string): Promise<any> {
        try{
            console.log('verify token in framwork jwt',token)
        
            const data = await jwt.verify(token,'itsjwtverificationkey')
            console.log('verify token in framwork jwt',data)
            
            return data
           }catch(error:any){
               console.log(error.message) 
           }
    }
    
}
