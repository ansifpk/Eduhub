
import userRoutes from "../service/endPoints/userEndPoints"
import { loginType } from "../@types/loginType"
import { registerType } from "../@types/registerType"
import ApiGatway from "@/service/axios"
import { ICourse } from "@/@types/courseType"
import useRequest from "@/hooks/useRequest";

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
export const tocken = async () => {
    try {
        const response = await ApiGatway.post(userRoutes.tocken);
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

export const editUser = async (userId:string,name:string,thumbnail:string,aboutMe:string) =>{
    try {
        const response = await ApiGatway.patch(`${userRoutes.editUser}/${userId}`,{name,thumbnail,aboutMe});
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
export const veryfyNewEmail = async (userId:string,email:string) =>{
    try {
        const response = await ApiGatway.post(`${userRoutes.changeEmailVeryfy}/${userId}`,{email});
        return response.data
    } catch (error) {
        return error 
    }
}

export const settingEmail = async (userId:string,email:string,otp:string) =>{
    try {
        const response = await ApiGatway.patch(`${userRoutes.changeEmail}/${userId}`,{email,otp});
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
export const getCourses = async (category:string ="",topic:string = "",level:string="",search:string = "",sort:string="",page:number) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.getCourses}?category=${category}&&topic=${topic}&&level=${level}&&search=${search}&&sort=${sort}&&page=${page}`);
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
export const stripePurchase = async (course:ICourse[],userId:string,couponCode:string="") =>{
    try {
       
        
        const response = await ApiGatway.post(userRoutes.stripePurchase,{course,userId,couponCode});
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

export const getTests = async (testId:string) =>{
    try {    
        const response = await ApiGatway.get(`${userRoutes.test}/${testId}`)
        return response.data
    } catch (error) {

        return error 
    }
}

export const submitTest = async (userId:string,testId:string,mark:number) =>{
    try {    
        const response = await ApiGatway.patch(`${userRoutes.test}/${testId}`,{userId,mark})
        return response.data
    } catch (error) {

        return error 
    }
}

export const getUserDetailes = async (userId:string) =>{
    try {
        
        const response = await ApiGatway.get(`${userRoutes.profile}?userId=${userId}`)
        return response.data
    } catch (error) {

        return error 
    }
}
export const resetPassword = async (userId:string,password:string,newPassword:string) =>{
    try {
        
        const response = await ApiGatway.patch(`${userRoutes.resetPassword}/${userId}`,{password,newPassword})
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

// coupons
export const fetchCoupons = async () =>{
    try {
        const response = await ApiGatway.get(userRoutes.coupons)
        return response.data
    } catch (error) {
        return error 
    }
}

export const couponDetailes = async (couponCode:string) =>{
    try {
        const response = await ApiGatway.get(`${userRoutes.coupons}/${couponCode}`);       
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

//! messages

export const createMessage = async(userId:string,recipientId:string,role:string)=>{
    try {
        const response = await ApiGatway.post(userRoutes.chat,{userId,recipientId,role});
        return response.data
    } catch (error) {
        return error 
    }
}

export const userChats = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.chat}?userId=${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getMessages = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.message}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getCurrentChat = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.privetChat}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const sendMessage = async(chatId:string,senderId:string,text:string)=>{
    try {
        const response = await ApiGatway.post(userRoutes.message,{chatId,senderId,text});
        return response.data
    } catch (error) {
        return error 
    }
}

export const instructorSubscriptions = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.subscriptions}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const userPlans = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.plans}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const purchaseSubscription = async(subscriptionId:string,userId:string)=>{
    try {
        const response = await ApiGatway.post(`${userRoutes.subscriptions}/${subscriptionId}`,{userId});
        return response.data
    } catch (error) {
        return error 
    }
}

export const viewDetailes = async(customerId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.customer}/${customerId}`);    
        return response.data
    } catch (error) {
        return error 
    }
}

export const reportCourse = async (content:string,courseId:string,report:string,userId:string)=>{
    try {
        const response = await ApiGatway.post(`${userRoutes.report}/${userId}`,{content,courseId,report});    
        return response.data
    } catch (error) {
        return error 
    }
}
export const getReports = async (courseId:string,userId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.report}/${userId}/${courseId}`);    
        return response.data
    } catch (error) {
        return error 
    }
}

export const sendNotification = async(recipientId:string,senderId:string)=>{
    try {
        const response = await ApiGatway.post(userRoutes.notification,{recipientId,senderId});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getNotifications = async(recipientId:string)=>{
    try {
        const response = await ApiGatway.get(`${userRoutes.notification}/${recipientId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const markAsReadNotification = async (senderId:string,userId:string)=>{
    try {
        const response = await ApiGatway.patch(`${userRoutes.notification}/${userId}/${senderId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const changeProfileImage = async(userId:string,formData:object)=>{
    try {
        const response = await ApiGatway.patch(`${userRoutes.profileImage}/${userId}`,formData,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        });
        return response.data
    } catch (error) {
        return error 
    }
}