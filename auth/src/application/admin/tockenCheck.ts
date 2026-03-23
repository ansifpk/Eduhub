import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { ITokenCheck } from "../../domain/interfaces/admin/useCases/ITokenCheck";

export class AdminTockenCheck implements ITokenCheck {
   constructor(private readonly jwt:IJwt){}
    public async execute(input:{ tocken:string}): Promise<IToken|void> {
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