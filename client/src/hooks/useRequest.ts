import ApiGatway from "../service/axios";
import { useState } from "react";

export default () => {
    const [err,setError] = useState<null|{message:string}[]>(null)

    const doRequest =  async({url,method,body,onSuccess}:{url:string,method:"post"|"get"|"patch"|"delete",body:object,onSuccess:(data?:any)=>void}) => {
       try {
        setError(null)
          const response = await ApiGatway[method](url,body)
          if(onSuccess){
            onSuccess(response.data)
          }
          return response.data;
       } catch (error:any) {
         setError(error.response.data.errors)
       }
    }
    return {doRequest,err};
}