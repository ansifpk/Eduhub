import ApiGatway from "@/service/client";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";

export const createCourse = async (data:object) =>{
    try {
        const response = await ApiGatway.post(instructorRoutes.createCourse,data,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        });       
        return response.data
    } catch (error) {
        return error 
    }
}