import { loginType } from "@/@types/loginType";
import ApiGatway from "@/service/axios";

import { axInstence } from "@/service/client";

import adminRoutes from "@/service/endPoints/adminEndPoints";


interface ICategory{
    _id?:string;
    title?:string;
    description?:string;
    topics?:string[];

}

export const adminLogin = async (loginData:loginType) =>{
    try {
        const response = await ApiGatway.post(adminRoutes.login,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}

export const category = async () =>{
    try {
        const response = await ApiGatway.get(adminRoutes.category);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const addCategory = async (data:ICategory) =>{
    try {
        const response = await ApiGatway.post(adminRoutes.addCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const editCategory = async (data:ICategory) =>{
    try {
        const response = await ApiGatway.patch(adminRoutes.editCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const listCategory = async (categoryId:string) =>{
    try {
        const response = await ApiGatway.patch(`${adminRoutes.listCategory}/${categoryId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const students = async (search:string="",sort:string="") =>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.students}?search=${search}&&sort=${sort}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const blockUser = async (userId:string) =>{
    try {
       
        const response = await ApiGatway.patch(`${adminRoutes.blockUser}/${userId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructors = async (search:string="",sort:string="") =>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.instructors}?search=${search}&&sort=${sort}`);       
        return response.data
    } catch (error) {
        return error 
    }
}


export const editProfile = async (instructorData:object) =>{
    try {
        const response = await ApiGatway.patch(adminRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCourses = async (search:string="",sort:string="") =>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.getCourses}?search=${search}&&sort=${sort}`);       
        return response.data
    } catch (error) {
        return error 
    }
}

//coupons

export const addCoupon = async (title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string) =>{
    try {
        const response = await ApiGatway.post(adminRoutes.coupon,{title,description,offer,startingDate,startingTime,expiryDate,expiryTime,couponCode});       
        return response.data
    } catch (error) {
        return error 
    }
}

export const deleteCoupon = async (couponId:string) =>{
    try {
        const response = await ApiGatway.delete(`${adminRoutes.coupon}/${couponId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}

export const editCoupon = async (couponId:string,title:string,description:string,offer:number,startingDate:string,startingTime:string,expiryDate:string,expiryTime:string,couponCode:string) =>{
    try {
        const response = await ApiGatway.patch(`${adminRoutes.coupon}/${couponId}`,{title,description,offer,expiryDate,expiryTime,startingDate,startingTime,couponCode});       
        return response.data
    } catch (error) {
        return error 
    }
}

export const getCoupons = async () =>{
    try {
        const response = await ApiGatway.get(adminRoutes.coupon);       
        return response.data
    } catch (error) {
        return error 
    }
}



//user
export const instructorAprovel = async (email:string,status:string) =>{
    try {
        const response = await ApiGatway.patch(adminRoutes.instructorAprovel,{email,status});       
        return response.data
    } catch (error) {
        return error 
    }
}

//!message

export const AdminSendMessage = async(chatId:string,senderId:string,text:string)=>{
    try {
        const response = await ApiGatway.post(adminRoutes.message,{chatId,senderId,text});
        return response.data
    } catch (error) {
        return error 
    }
}
export const AdminSendNotification = async(recipientId:string,senderId:string)=>{
    try {
        const response = await ApiGatway.post(adminRoutes.notification,{recipientId,senderId});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getNotifications = async(recipientId:string)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.notification}/${recipientId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const AdminChats = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.chat}?userId=${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getAdminMessages = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.message}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getAdminCurrentChat = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.privetChat}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const top10Courses = async(limit:number)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.getCourses}/${limit}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const adminCreateMessage = async(userId:string,recipientId:string,role:string)=>{
    try {
        const response = await ApiGatway.post(adminRoutes.chat,{userId,recipientId,role});
        return response.data
    } catch (error) {
        return error 
    }
}

//* subscriptions

export const adminCreateSubscription = async(price:number,plan:string,description:string[])=>{
    try {
        const response = await ApiGatway.post(adminRoutes.subscription,{price,plan,description});
        return response.data
    } catch (error) {
        return error 
    }
}

export const getSubscriptions = async()=>{
    try {
        const response = await ApiGatway.get(adminRoutes.subscription);
        return response.data
    } catch (error) {
        return error 
    }
}

export const deleteSubscription = async(subscriptionId:string)=>{
    try {
        const response = await ApiGatway.delete(`${adminRoutes.subscription}/${subscriptionId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const editSubscription = async(subscriptionId:string,price:number)=>{
    try {
        const response = await ApiGatway.patch(`${adminRoutes.subscription}/${subscriptionId}`,{price});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getSalesReports = async (report:string,year:string,month:number)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.order}?report=${report}&&year=${year}&&month=${month}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const createReport = async (report:string,year:string,month:number)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.salesReports}?report=${report}&&year=${year}&&month=${month}`,{responseType:'blob'});
        return response.data
    } catch (error) {
        return error 
    }
}

export const getReports = async ()=>{
    try {
        const response = await ApiGatway.get(adminRoutes.report);
        return response.data
    } catch (error) {
        return error 
    }
}
export const top5Courses = async ()=>{
    try {
        const response = await ApiGatway.get(adminRoutes.course);
        return response.data
    } catch (error) {
        return error 
    }
}
export const top5Instructors = async ()=>{
    try {
        const response = await ApiGatway.get(adminRoutes.top5Instructors);
        return response.data
    } catch (error) {
        return error 
    }
}

