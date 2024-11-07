import { loginType } from "@/@types/loginType";
import Api from "@/service/axios";
import ApiCategory from "@/service/category";
import adminRoutes from "@/service/endPoints/adminEndPoints";

interface ICategory{
    _id?:string;
    title?:string;
    description?:string;
    topics?:string[];

}

export const adminLogin = async (loginData:loginType) =>{
    try {
        const response = await Api.post(adminRoutes.login,loginData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const googleLogin = async (googleLoginData:object) =>{
    try {
        const response = await Api.post(adminRoutes.googleLogin,googleLoginData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const category = async () =>{
    try {
        const response = await ApiCategory.post(adminRoutes.category);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const addCategory = async (data:ICategory) =>{
    try {
        const response = await ApiCategory.post(adminRoutes.addCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const editCategory = async (data:ICategory) =>{
    try {
        const response = await ApiCategory.patch(adminRoutes.editCategory,data);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const listCategory = async (categoryId:string) =>{
    try {
        const response = await ApiCategory.patch(`${adminRoutes.listCategory}/${categoryId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const students = async () =>{
    try {
        const response = await Api.post(adminRoutes.students);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const blockStudents = async (studnetId:string) =>{
    try {
        console.log(adminRoutes.blockStudents,studnetId)
        const response = await Api.patch(`${adminRoutes.blockStudents}/${studnetId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructors = async () =>{
    try {
        const response = await Api.post(adminRoutes.instructors);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const blockInstructors = async (instructorId:string) =>{
    try {
        const response = await Api.patch(`${adminRoutes.blockInstructors}/${instructorId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const editProfile = async (instructorData:object) =>{
    try {
        const response = await Api.patch(adminRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
