import ApiGatway from "@/service/axios";
import { useState } from "react";

export default () => {
    const [errors,setError] = useState<null|{message:string}[]>(null)

    const doRequest =  async({url,method,body,onSuccess}:{url:string,method:"post"|"get"|"patch"|"delete",body:object,onSuccess:(data?:any)=>void}) => {
       try {
        setError(null)
          const response = await ApiGatway[method](url,body)
          if(onSuccess){
            onSuccess(response.data)
          }
          return response.data;
       } catch (err:any) {
        console.log("hook err",err);
         setError(err.response.data.errors)
       }
    }
    return {doRequest,errors};
}