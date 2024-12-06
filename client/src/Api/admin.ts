import { loginType } from "@/@types/loginType";

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
        const response = await axInstence.post(adminRoutes.login,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}

export const category = async () =>{
    try {
        const response = await axInstence.get(adminRoutes.category);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const addCategory = async (data:ICategory) =>{
    try {
        const response = await axInstence.post(adminRoutes.addCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const editCategory = async (data:ICategory) =>{
    try {
        const response = await axInstence.patch(adminRoutes.editCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const listCategory = async (categoryId:string) =>{
    try {
        const response = await axInstence.patch(`${adminRoutes.listCategory}/${categoryId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const students = async () =>{
    try {
        const response = await axInstence.get(adminRoutes.students);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const blockUser = async (userId:string) =>{
    try {
       
        const response = await axInstence.patch(`${adminRoutes.blockUser}/${userId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructors = async () =>{
    try {
        const response = await axInstence.get(adminRoutes.instructors);       
        return response.data
    } catch (error) {
        return error 
    }
}


export const editProfile = async (instructorData:object) =>{
    try {
        const response = await axInstence.patch(adminRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCourses = async () =>{
    try {
        const response = await axInstence.get(adminRoutes.getCourses);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructorAprovel = async (email:string,status:string) =>{
    try {
        const response = await axInstence.patch(adminRoutes.instructorAprovel,{email,status});       
        return response.data
    } catch (error) {
        return error 
    }
}
