import express from "express";
import { adminRouter } from "./presentation/routers/adminRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import { userRouter } from "./presentation/routers/userRouter";
import { instructorRouter } from "./presentation/routers/instructorRouter";
import {createServer} from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.set("trust proxy", true);

export const allowedOrgins = JSON.parse(process.env.ORGINS ?? "[]");

app.use(
  cors({
    origin: allowedOrgins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth/user", userRouter);
app.use("/auth/admin", adminRouter);
app.use("/auth/instructor", instructorRouter);

app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);
const httpServer = createServer(app);
export { httpServer };  