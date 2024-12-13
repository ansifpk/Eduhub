
import userRoutes from "../service/endPoints/userEndPoints"
import { loginType } from "../@types/loginType"
import { registerType } from "../@types/registerType"
import { axInstence } from "@/service/client"
import ApiGatway from "@/service/axios"

export const signup = async (registerData: registerType) => {
    try {
        const response = await ApiGatway.post(userRoutes.signUp,registerData);
        return response.data
    } catch (err) {
        return err
        
    }
}
export const otpVerify = async (otp:string,email:string) => {
    try {
        const response = await ApiGatway.post(userRoutes.verifyOtp,{otp,email})
        return response.data
    } catch (err) {
        return err
        
    }
}
export const userLogin = async (loginData:loginType) =>{
    try {
        const response = await ApiGatway.post(userRoutes.login,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const googleLogin = async (loginData:object) =>{
    try {
        const response = await ApiGatway.post(userRoutes.googleLogin,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}

export const editUser = async (userData:object) =>{
    try {
        const response = await ApiGatway.patch(userRoutes.editUser,userData);
        return response.data
    } catch (error) {
        return error 
    }
}
export const resentOtp = async (email:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.resentOtp,{email});
        return response.data
    } catch (error) {
        return error 
    }
}
export const forgetPassword = async (email:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.verifyEmail,{email});
        return response.data
    } catch (error) {
        return error 
    }
}
export const verifyPassOtp = async (email:string,otp:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.verifyPassOtp,{email,otp});
        return response.data
    } catch (error) {
        return error 
    }
}
export const newPassword = async (email:string,password:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.newPassword,{email,password});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCourses = async (category:string ="",topic:string = "",level:string="",search:string = "") =>{
    try {
  
        const response = await ApiGatway.get(`${userRoutes.getCourses}?category=${category}&&topic=${topic}&&level=${level}&&search=${search}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const stripePurchase = async (course:object) =>{
    try {
        const response = await ApiGatway.post(userRoutes.stripePurchase,{course});
        return response.data
    } catch (error) {
        return error 
    }
}
export const puchasedCourses = async (userId:string) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.puchasedCourses}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const courseDetailes = async (courseId:string) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.courseDeatiles}/${courseId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const createOrder = async (orderData:any) =>{
    try {
        console.log("byr");
        
        const response = await ApiGatway.post(userRoutes.createOrder,{orderData})
        return response.data
    } catch (error) {

        return error 
    }
}
export const logout = async () =>{
    try {
        const response = await ApiGatway.post(userRoutes.logout);
        return response.data
    } catch (error) {
        return error 
    }
}
