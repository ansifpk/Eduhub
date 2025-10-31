import { ApiServer } from "./presentation/ApiServer"
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
    ApiServer.run(Number(process.env.PORT))
}
main()