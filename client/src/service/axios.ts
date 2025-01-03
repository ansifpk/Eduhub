import axios from 'axios'
const ApiGatway = axios.create({
    baseURL: import.meta.env.VITE_APIGATEWAY, 
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
})


export default ApiGatway;