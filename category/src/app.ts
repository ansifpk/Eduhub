import express from "express";
import cors from "cors";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import cookieParser from "cookie-parser";
import { instructorRouter } from "./presentation/routes/instructorRouter";
import { categoryRouter } from "./presentation/routes/categoryRouter";
const app = express();

app.set("trust proxy", true);
const allowedOrgins = JSON.parse(process.env.ORGINS ?? "[]");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: allowedOrgins }));

app.use(cookieParser());

app.use("/category/admin", categoryRouter);
app.use("/category/instructor", instructorRouter);
app.all("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);

export {app}