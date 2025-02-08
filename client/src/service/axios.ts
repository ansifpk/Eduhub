import axios from 'axios'
import { tocken } from '@/Api/user';
const ApiGatway = axios.create({ 
    baseURL: import.meta.env.VITE_APIGATEWAY, 
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
})



ApiGatway.interceptors.response.use(
  response => response,
  async function (error) {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              console.log("machu am here on intercpetre")
              await tocken()
              return ApiGatway(originalRequest);
          } catch (err) {
              console.log(err, "from interptor")
              return Promise.reject(err);
          }
      }
      return Promise.reject(error);
  }
);

export default ApiGatway;