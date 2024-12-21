
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

export const instructorCourses = async (instructorId:string) => {
    try {
        const response = await ApiGatway.get(`${userRoutes.fetchCourses}/${instructorId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getInstructorRatings = async (instructorId:string) => {
    try {
        const response = await ApiGatway.get(`${userRoutes.instructorRating}/${instructorId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const editInstructorRating = async (ratingId:string,review:string,stars:number) => {
    try {
        const response = await ApiGatway.patch(userRoutes.instructorRating,{ratingId,review,stars});
        return response.data
    } catch (error) {
        return error 
    }
}
export const deleteInstructorRating = async (instructorId:string) => {
    try {
        const response = await ApiGatway.delete(`${userRoutes.instructorRating}/${instructorId}`);
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
export const addToCart = async (courseId:string,userId:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.addToCart,{courseId,userId});
        return response.data
    } catch (error) {
        return error 
    }
}

export const ratingCourse = async (review:string,stars:number,courseId:string,userId:string) =>{
    try {
        const response = await ApiGatway.post(userRoutes.ratingCourse,{review,stars,courseId,userId});
        return response.data
    } catch (error) {
        return error 
    }
}

export const removeFromcart = async (courseId:string,userId:string) =>{
    try {
        const response = await ApiGatway.delete(`${userRoutes.addToCart}/${courseId}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const userCart = async (userId:string) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.Cart}/${userId}`);
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
        const response = await ApiGatway.post(userRoutes.createOrder,{orderData})
        return response.data
    } catch (error) {

        return error 
    }
}

export const getUserDetailes = async (userId:string) =>{
    try {
        
        const response = await ApiGatway.get(`${userRoutes.profile}/${userId}`)
        return response.data
    } catch (error) {

        return error 
    }
}

export const getRatings = async (courseId:string) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.ratingCourse}/${courseId}`)
        return response.data
    } catch (error) {

        return error 
    }
}

export const editRating = async (ratingId:string,review:string,stars:number) =>{
    try {
        const response = await ApiGatway.patch(userRoutes.ratingCourse,{ratingId,review,stars})
        return response.data
    } catch (error) {

        return error 
    }
}

export const deleteRating = async (ratingId:string) =>{
    try {
        const response = await ApiGatway.delete(`${userRoutes.ratingCourse}/${ratingId}`)
        return response.data
    } catch (error) {

        return error 
    }
}

export const instructorRating = async (instructorId:string,userId:string,review:string,stars:number) =>{
    try {
        const response = await ApiGatway.post(userRoutes.instructorRating,{instructorId,userId,review,stars})
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
