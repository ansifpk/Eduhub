import dotenv from 'dotenv';
dotenv.config();
import { ApiServer } from './presentation/ApiServer';

function main() {
    ApiServer.run(Number(process.env.PORT!))
    process.on("SIGTERM", () => process.exit());
    process.on("SIGINT", () => process.exit());
}
main();