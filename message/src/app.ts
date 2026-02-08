import { charRouter } from "./presentation/routes/chatRoutes";
import { messageRouter } from "./presentation/routes/messageRoutes";
import { notificationRouter } from "./presentation/routes/notificationRoutes";
import { createServer } from "http";
import { errorHandler, NotFoundError } from "@eduhublearning/common";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

const httpServer = createServer(app);
export const allowedOrgins = JSON.parse(process.env.ORGINS!);

app.set("trust proxy", true);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrgins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* chat
app.use("/message/chat", charRouter);
//* message
app.use("/message/message", messageRouter);
//* notification
app.use("/message/notification", notificationRouter);
app.use("*", (req, res) => {
  throw new NotFoundError("Path Not Found.");
});
app.use(errorHandler as any);

export { httpServer };
