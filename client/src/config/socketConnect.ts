import { io } from "socket.io-client";

const connectSocket = ()=>{
   try {
       const socket =  io("https://www.eduhublearning.online", {
         path: "/message/socket.io",
       });
       return socket
   } catch (error) {
    console.error(error)
   }
}

export default connectSocket