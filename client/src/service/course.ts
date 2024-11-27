
import axios from 'axios'
const ApiCourse = axios.create({
    baseURL:'http://localhost:3002',
    headers:{'Content-Type':'application/json'},
    withCredentials:true
})

ApiCourse.interceptors.request.use(
    (config) => {
       
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const verifyToken = localStorage.getItem("verifyToken");
        // console.log("axios req suc",'accessToken',accessToken,'refreshToken',refreshToken,'verifyToken',verifyToken)
        
        if(verifyToken){
            // console.log('accessToken ind ',verifyToken)
            config.headers['x-verify-token'] = verifyToken
        }
        if(accessToken){
            // console.log('refreshToken ind',accessToken,)
            config.headers['authorization'] = accessToken
        }
        if(refreshToken){
            // console.log('verifyToken ind',refreshToken);
            config.headers['x-refresh-token'] = refreshToken
        }
      
        
        return config;
    },
    (error) => {
        console.log("axios req err")
        return Promise.reject(error);
    }
)
ApiCourse.interceptors.response.use(
    response => {
        console.log("axios re")
        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    },
);
export default ApiCourse;