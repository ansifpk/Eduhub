import { errorHandler, NotFoundError } from "@eduhublearning/common";
import { userRouter } from "./presentation/routes/userRouter";
import { adminRouter } from "./presentation/routes/adminRouter";
import { instructorRouter } from "./presentation/routes/instructorRouter";
import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';

const app = express();
       app.set("trust proxy", true);
       app.use(express.json({ limit: "50mb" }));
       app.use(express.urlencoded({ limit: "50mb", extended: true }));
       
       const allowedOrgins = JSON.parse(process.env.ORGINS!);
       app.use(cors({ credentials: true, origin: allowedOrgins }));
       
       app.use(cookieParser());

       app.use("/profile/user", userRouter);
       app.use("/profile/admin", adminRouter);
       app.use("/profile/instructor", instructorRouter);
       app.use("*", (req, res) => {
         throw new NotFoundError("Path Not Found.");
       });
       app.use(errorHandler as any);

       export {app}