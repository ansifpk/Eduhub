import { ApiServer } from "./presentation/ApiServer";
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
    try {
        await ApiServer.run(Number(process.env.PORT))
    } catch (error) {
        console.error(error);
    }
}
main()