import Api from "@/service/axios";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";

export const editProfile = async (instructorData:object) =>{
    try {
       
        const response = await Api.patch(instructorRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const register = async (instructorData:object) =>{
    try {
        const response = await Api.post(instructorRoutes.register,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const currentUser = async (userId:string) =>{
    try {
        const response = await Api.get(`${instructorRoutes.currentUser}/${userId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}