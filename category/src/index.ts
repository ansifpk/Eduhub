import dotenv from 'dotenv'
import { ApiServer } from './presentation/ApiServer';
dotenv.config();

function  main() {
    ApiServer.run(Number(process.env.PORT!))
    process.on("SIGTERM", () => process.exit());
    process.on("SIGINT", () => process.exit());
}

main()