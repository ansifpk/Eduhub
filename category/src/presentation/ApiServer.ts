import { app } from '../app';
import { connectDB } from '../infrastructure/db/config';


export class ApiServer {
 
    public static async run(port:number):Promise<void>{
        try {
            await connectDB();
            app.listen(port,()=>console.log(`category server running on ${process.env.PORT}`))
        } catch (error) {
            console.error(error);
        }
    }
}