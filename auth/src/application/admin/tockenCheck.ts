import { NextFunction } from "express";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { IUseCase } from "../../shared/IUseCase";
import { JWTtocken } from "../../infrastructure/services/jwt";

export class AdminTockenCheck implements IUseCase<{tocken:string,next: NextFunction},IToken|void> {
   constructor(private readonly jwt:JWTtocken){}
    public async execute(input:{ tocken:string,next: NextFunction}): Promise<IToken|void> {
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
      }
    }
}