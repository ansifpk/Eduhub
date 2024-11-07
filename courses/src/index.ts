import express from 'express';
import { connectDB } from './framWorks/webServer/config/config';
import cors from 'cors';
import { json } from 'express';
import { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './framWorks/webServer/routes/adminRouter';
import { InstructorRouter } from './framWorks/webServer/routes/instructorRouter';
connectDB();

const app = express();

app.use(cors())
app.use(json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

const adminRoute = express.Router()
const instructorRoute = express.Router()
AdminRouter(adminRoute)
InstructorRouter(instructorRoute);

app.use("/admin",adminRoute)
app.use("/instructor",instructorRoute)

app.listen(3002,()=>console.log("running at 3002"))