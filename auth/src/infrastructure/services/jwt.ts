
import jwt from 'jsonwebtoken';
import { IJwt, IToken } from '../../domain/interfaces/serviceInterfaces/IJwt';
interface payload {
     "id": string,
     "iat": number,
     "exp": number
 }

export class JWTtocken implements IJwt{
    async frogetPassword(id: string): Promise<string> {
        const payload  = {id}
        const forgetToken = jwt.sign(payload, process.env.JWT_FORGOTPASSWORD_KEY!, {
            expiresIn: '1d'
        })
        return forgetToken;
    }
    
    async createVerificationJwt(payload: any): Promise<string> {
        const verifyToken = jwt.sign(payload, process.env.JWT_VERIFICATION_KEY!, {
            expiresIn: '1d'
        })
        return verifyToken;
    }
    async createAccessAndRefreashToken(id: string): Promise<IToken> {
       
        const payload = {id}
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY!, {
            expiresIn: '15m'
        })
         const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY!, {
             expiresIn: '30d',
         })
          return {accessToken,refreshToken}
    }
    async verifyAccessJwt(token: string): Promise<any> {
        try{
            const data = jwt.verify(token, process.env.JWT_ACCESS_KEY!)
            return data
           }catch(error:any){
               console.log(error.message) 
           }
    }
    async verifyRefreshJwt(token: string): Promise<payload|void> {
        try{
            const data = jwt.verify(token, process.env.JWT_REFRESH_KEY!)
            if(data){
                return data as payload
            }
         
           }catch(error){
               console.log(error) 
           }
    }
    async verifyJwt(token: string): Promise<any|void> {
        try{
            const data = jwt.verify(token, process.env.JWT_VERIFICATION_KEY!)
            return data
           }catch(error:any){
               console.log(error.message) 
           }
    }
    
}
