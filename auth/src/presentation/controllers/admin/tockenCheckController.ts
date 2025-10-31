import { Request, Response, NextFunction } from "express";
import { IController } from "../../../shared/IController";
import { AdminTockenCheck } from "../../../application/admin/tockenCheck";
import { ForbiddenError } from "@eduhublearning/common";

export class AdminTockenCheckController implements IController {
    constructor(private readonly _useCase:AdminTockenCheck) {
        
    }
    public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {      
                  if(!req.cookies.refreshAdminToken){
                    throw new ForbiddenError()
                  }
                  const tocken = req.cookies.refreshAdminToken;
                  
                  const tockens  = await this._useCase.execute({tocken,next})
                  if(tockens){
                   
                    res.cookie('accessAdminToken',tockens.accessToken,{
                      httpOnly:true,
                      secure:process.env.NODE_ENV !== 'development',
                      sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
                      path:"/",
                      maxAge: 15 * 60 * 1000
                   });
                    res.cookie('refreshAdminToken',tockens.refreshToken,{
                      httpOnly:true,
                      secure:process.env.NODE_ENV !== 'development',
                      sameSite:process.env.NODE_ENV !== 'development'?'none':'strict',
                      path:"/",
                      maxAge:30 * 24 * 60 * 60 * 1000
                   });
                    res.send({success:true,tockens});
                  }
                } catch (error) {
                  console.error(error);
                  next(error)
                }
    }
}