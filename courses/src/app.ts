import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, NotFoundError } from '@eduhublearning/common';
import { adminRoute } from './presentation/routes/adminRouter';
import { instructorRoute } from './presentation/routes/instructorRoute';
import { userRoute } from './presentation/routes/userRoute';


const app = express();
app.use(cookieParser());
app.set("trust proxy", true);
const allowedOrgins = JSON.parse(process.env.ORGINS!);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ credentials: true, origin: allowedOrgins }));
app.use("/course/admin", adminRoute);
app.use("/course/instructor", instructorRoute);
app.use("/course/user", userRoute);
app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);

export {app};