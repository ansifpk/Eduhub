import ApiGatway from "@/service/client";
import adminRoutes from "@/service/endPoints/adminEndPoints";

export const createReport = async (start:string,end:string)=>{
    try {
        const response = await ApiGatway.get(`${adminRoutes.salesReports}?start=${start}&&end=${end}`,{responseType:'blob'});
        return response.data
    } catch (error) {
        return error 
    }
}