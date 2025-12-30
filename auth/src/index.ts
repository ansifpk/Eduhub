
import dotenv from 'dotenv';
import { ApiServer } from './presentation/ApiServer';
dotenv.config();

if (process.env.NODE_ENV !== "test") {
  async function main():Promise<void>{
  await ApiServer.run(Number(process.env.PORT)!);
 }
   main();
}
