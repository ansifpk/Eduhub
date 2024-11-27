import Api from "../service/axios"
import userRoutes from "../service/endPoints/userEndPoints"
import { loginType } from "../@types/loginType"
import { registerType } from "../@types/registerType"
import ApiCourse from "@/service/course"
import ApiOrder from "@/service/order"

export const signup = async (registerData: registerType) => {
    try {
        const response = await Api.post(userRoutes.signUp,registerData)
        return response.data
    } catch (err) {
        return err
        
    }
}
export const otpVerify = async (otp:string,email:string) => {
    try {
        const response = await Api.post(userRoutes.verifyOtp,{otp,email})
        return response.data
    } catch (err) {
        return err
        
    }
}
export const userLogin = async (loginData:loginType) =>{
    try {
        const response = await Api.post(userRoutes.login,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const googleLogin = async (loginData:object) =>{
    try {
        const response = await Api.post(userRoutes.googleLogin,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}

export const editUser = async (userData:object) =>{
    try {
        const response = await Api.patch(userRoutes.editUser,userData);
        return response.data
    } catch (error) {
        return error 
    }
}
export const resentOtp = async (email:string) =>{
    try {
        const response = await Api.post(userRoutes.resentOtp,{email});
        return response.data
    } catch (error) {
        return error 
    }
}
export const forgetPassword = async (email:string) =>{
    try {
        const response = await Api.post(userRoutes.verifyEmail,{email});
        return response.data
    } catch (error) {
        return error 
    }
}
export const verifyPassOtp = async (email:string,otp:string) =>{
    try {
        const response = await Api.post(userRoutes.verifyPassOtp,{email,otp});
        return response.data
    } catch (error) {
        return error 
    }
}
export const newPassword = async (email:string,password:string) =>{
    try {
        const response = await Api.post(userRoutes.newPassword,{email,password});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCourses = async () =>{
    try {
        const response = await ApiCourse.get(userRoutes.getCourses);
        return response.data
    } catch (error) {
        return error 
    }
}
export const puchasedCourses = async (userId:string) =>{
    try {
        const response = await ApiOrder.get(`${userRoutes.puchasedCourses}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const courseDetailes = async (courseId:string) =>{
    try {
        const response = await ApiCourse.get(`${userRoutes.courseDeatiles}/${courseId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const createOrder = async (orderData:any) =>{
    try {
        console.log("byr");
        
        const response = await ApiOrder.post(userRoutes.createOrder,{orderData})
        return response.data
    } catch (error) {

        return error 
    }
}
export const logout = async () =>{
    try {
        const response = await Api.post(userRoutes.logout);
        return response.data
    } catch (error) {
        return error 
    }
}
