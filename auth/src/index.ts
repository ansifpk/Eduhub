import dotenv from 'dotenv';
import { ApiServer } from './presentation/ApiServer';
dotenv.config();

function main() {
    ApiServer.run(Number(process.env.PORT!))
}
main