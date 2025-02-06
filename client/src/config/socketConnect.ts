import { io } from "socket.io-client";

const connectSocket = ()=>{
   try {
       const socket =  io(import.meta.env.VITE_APIGATEWAY, {
         path: "/message/socket.io",
       });
       return socket
   } catch (error) {
    console.error(error)
   }
}

export default connectSocket