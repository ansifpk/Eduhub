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

export const adminCreateMessage = async(userId:string,recipientId:string,role:string)=>{
    try {
        const response = await ApiGatway.post(adminRoutes.chat,{userId,recipientId,role});
        return response.data
    } catch (error) {
        return error 
    }
}