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

export const createReport = async (instructorId:string,start:string,end:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.salesReports}?instructorId=${instructorId}&&start=${start}&&end=${end}`,{responseType:'blob'});
        return response.data
    } catch (error) {
        return error 
    }
}