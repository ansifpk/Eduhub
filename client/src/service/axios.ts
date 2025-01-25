import axios from 'axios'
const ApiGatway = axios.create({ 
    baseURL: import.meta.env.LOAD_BALANCER, 
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
})


export default ApiGatway;