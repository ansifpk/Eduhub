import { User } from "@/@types/userType";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";


import.meta.env.VITE_APIGATEWAY

const SocketContext = createContext<Socket|null>(null);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [socket,setSocket] = useState<Socket|null>(null);
    const userId = useSelector((state:User)=>state.id);
    useEffect(()=>{
        if(userId){
            const newSocket = io(import.meta.env.VITE_APIGATEWAY,{
                path: '/auth/socket.io'
            })
            console.log("hii",userId,`block:${userId}`)
            setSocket(newSocket);
            newSocket.on(`block:${userId}`,(userId)=>{
              console.log("you are blocked",userId)
              toast.error("you are blocked")
            })
            return ()=>{
                newSocket.disconnect();
            }
        }
    },[userId]);
    
    return (
        <SocketContext.Provider value={socket} >{children}</SocketContext.Provider>
    )
}

export const useSocket = () =>{
    return useContext(SocketContext);
}

