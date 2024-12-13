import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT || 3005
const app = express()

const service = {
    auth:'http://localhost:3000',
    category:'http://localhost:3001',
    course:'http://localhost:3002',
    profile:'http://localhost:3004',
    purchase:'http://localhost:3003'

}
app.use('/auth',createProxyMiddleware({target:service.auth,changeOrigin:true}))
app.use('/category',createProxyMiddleware({target:service.category,changeOrigin:true}))
app.use('/course',createProxyMiddleware({target:service.course,changeOrigin:true}))
app.use('/profile',createProxyMiddleware({target:service.profile,changeOrigin:true}))
app.use('/purchase',createProxyMiddleware({target:service.purchase,changeOrigin:true}))

app.listen(port,()=>{
    console.log(`API Gateway is running on http://localhost:${port}`)
})