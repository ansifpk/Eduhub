import axios from 'axios'
const ApiUser = axios.create({
    baseURL:'http://localhost:3004',
    headers:{
        "Content-Type": 'application/json'
    },
    withCredentials:true
})


export default ApiUser;