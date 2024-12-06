import axios from "axios";

const axInstence = axios.create({
    baseURL: 'https://eduhub.dev' ,
    headers:{
        "Content-Type": 'application/json',
    },
    withCredentials:true
})

export {axInstence}

