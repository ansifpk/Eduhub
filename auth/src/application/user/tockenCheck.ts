import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import { IJwt, IToken } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { ITokenCheck } from "../../domain/interfaces/user/useCases/ITokenCheck";

export class TockenCheck implements ITokenCheck {
    constructor(private readonly _jwtToken:IJwt) {
        
    }
    public async execute(input: {tocken: string}): Promise<IToken | void> {
         try {
              const decoded = await this._jwtToken.verifyRefreshJwt(input.tocken);
           
              if (decoded) {
                const tockens = await this._jwtToken.createAccessAndRefreashToken(
                  decoded.id
                );
                if (tockens) {
                  return tockens;
                }
              } else {
                throw new BadRequestError(ErrorMessages.INVALID_TOKEN);
              }
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
}