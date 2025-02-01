import { NextFunction, Request, Response } from "express";
import { IAdminUseCase } from "../useCases/interfaces/useCases/IAdminUseCase";


export class AdminController{
    constructor(
      private adminUseCase:IAdminUseCase
    ){}

    async createSubscription(req:Request,res:Response,next:NextFunction){
        const {price,description,plan} = req.body
        const subscription = await this.adminUseCase.createSubscription(price,plan,description,next)
        if(subscription){
            return res.send({success:true,subscription:subscription});
        }
    }

    async getSubscriptions(req:Request,res:Response,next:NextFunction){
       
        const subscriptions = await this.adminUseCase.getSubscriptions()
        if(subscriptions){
            return res.send({success:true,subscriptions:subscriptions});
        }
    }
    async deleteSubscription(req:Request,res:Response,next:NextFunction){
       try {
        const {subscriptionId}  =req.params
         const subscription = await this.adminUseCase.deleteSubscription(subscriptionId,next)
         if(subscription){
             return res.send({success:true});
         }
       } catch (error) {
        console.error(error)
       }
    }

    async editSubscription(req:Request,res:Response,next:NextFunction){
       try {
        const {subscriptionId}  =req.params
        const {price}  = req.body
         const subscription = await this.adminUseCase.editSubscription(subscriptionId,parseInt(price),next)
         if(subscription){
             return res.send({success:true});
         }
       } catch (error) {
        console.error(error)
       }
    }
    async getOrders(req:Request,res:Response,next:NextFunction){
       try {
        const {report,year,month}  = req.query 
         const orders = await this.adminUseCase.getOrders(report as string,year as string,month as string,next)
         if(orders){
             return res.send({success:true,orders});
         }
       } catch (error) {
        console.error(error)
       }
    }
    async salesReports(req:Request,res:Response,next:NextFunction){
       try {
          const {report,year,month}  = req.query 
          const workbook = await this.adminUseCase.createReport(report as string,year as string,month as string,next)
        if(workbook){
           workbook.xlsx.writeBuffer().then((data) => {
            res.status(200).send(data);
            })
          }
        
       } catch (error) {
        console.error(error)
       }
    }
}