import axios from 'axios'
import { tocken } from '@/Api/user';
import { tockenInstructor } from '@/Api/instructor';
import { tockenAdmin } from '@/Api/admin';
import { removeUser } from '@/redux/authSlice';
import { store } from '@/redux/store';


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
              let undPoints = originalRequest.url.split("/")
              
              if(undPoints[2].startsWith("admin")){
                await tockenAdmin()
                
              }else if(undPoints[2].startsWith("user")){
                await tocken()
              }else{
                await tockenInstructor()
                
              }
              
              return ApiGatway(originalRequest);
          } catch (err) {
              store.dispatch(removeUser());
              return Promise.reject(err);
          }
      }
      return Promise.reject(error);
  }
);

export default ApiGatway;