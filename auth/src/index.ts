
import dotenv from 'dotenv';
import { ApiServer } from './presentation/ApiServer';
dotenv.config();

 async function main():Promise<void>{
  await ApiServer.run(Number(process.env.PORT)!);
}
main();