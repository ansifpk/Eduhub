import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { ICheckToken } from "../../domain/interfaces/instructor/useCases/ICheckToken";

export class CheckTocken implements ICheckToken {
    constructor(private readonly jwt:IJwt) {
        
    }
    public async execute(input: {tocken:string}): Promise<IToken|void> {
        try {
          const decoded = await this.jwt.verifyRefreshJwt(input.tocken)
          
          if(decoded){
           const tockens =  await this.jwt.createAccessAndRefreashToken(decoded.id);
           if(tockens){
            return tockens
           }
          }
          
        } catch (error) {
          console.error(error)
          throw error;
        }
    }
}