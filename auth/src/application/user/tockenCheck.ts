import { BadRequestError } from "@eduhublearning/common";
import { JWTtocken } from "../../infrastructure/services/jwt";
import { IUseCase } from "../../shared/IUseCase";
import { IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { NextFunction } from "express";

export class TockenCheck implements IUseCase<{tocken: string,
    next: NextFunction},IToken | void> {
    constructor(private readonly _jwtToken:JWTtocken) {
        
    }
    public async execute(input: {tocken: string,
    next: NextFunction}): Promise<IToken | void> {
         try {
              const decoded = await this._jwtToken.verifyRefreshJwt(input.tocken);
              console.log("check", decoded);
        
              if (decoded) {
                const tockens = await this._jwtToken.createAccessAndRefreashToken(
                  decoded.id
                );
                if (tockens) {
                  return tockens;
                }
              } else {
                throw new BadRequestError("Invalid token");
              }
            } catch (error) {
              console.error(error);
              input.next(error);
            }
          }
}