import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT 
const app = express()

const service = {
    auth:process.env.AUTHURL,
    category:process.env.CATEGORYURL,
    course:process.env.COURSEURL,
    purchase:process.env.PURCHASEURL,
    profile:process.env.PROFILEURL,
    message:process.env.MESSAGEURL

}
app.use('/auth',createProxyMiddleware({target:service.auth,changeOrigin:true}))
app.use('/category',createProxyMiddleware({target:service.category,changeOrigin:true}))
app.use('/course',createProxyMiddleware({target:service.course,changeOrigin:true}))
app.use('/profile',createProxyMiddleware({target:service.profile,changeOrigin:true}))
app.use('/purchase',createProxyMiddleware({target:service.purchase,changeOrigin:true}))
app.use('/message',createProxyMiddleware({target:service.message,changeOrigin:true}))

app.listen(port,()=>{
    console.log(`API Gateway is running on http://localhost:${port}`)
})