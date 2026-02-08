import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import { webHookRouter } from "./presentation/routers/webHookRouter";
import { userRouter } from "./presentation/routers/userRouter";
import { instructorRouter } from "./presentation/routers/instructorRouter";
import { adminRouter } from "./presentation/routers/adminRouter";
const app = express();
app.set("trust proxy", true);

const allowedOrgins = JSON.parse(process.env.ORGINS!);
app.use(cors({ credentials: true, origin: allowedOrgins }));
app.use(cookieParser());
app.use("/purchase/webHook", webHookRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/purchase/user", userRouter);
app.use("/purchase/instructor", instructorRouter);
app.use("/purchase/admin", adminRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);

export { app };
