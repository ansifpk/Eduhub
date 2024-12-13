import axios from 'axios'
const ApiGatway = axios.create({
    baseURL:' http://localhost:3005',
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
})


export default ApiGatway;