import { User } from "@/@types/userType";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";


import.meta.env.VITE_APIGATEWAY

const SocketContext = createContext<Socket|null>(null);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [socket,setSocket] = useState<Socket|null>(null);
    const userEmail = useSelector((state:User)=>state.email);
    useEffect(()=>{
        if(userEmail){
            const newSocket = io(import.meta.env.VITE_APIGATEWAY,{
                path: '/auth/socket.io'
            })
           
            newSocket.on(`user:${userEmail}`,()=>{
                toast.error("Access Blocked by Admin")
            });
            setSocket(newSocket);

            return ()=>{
                newSocket.disconnect();
            }
        }
    },[userEmail]);

    return (
        <SocketContext.Provider value={socket} >{children}</SocketContext.Provider>
    )
}

export const useSocket = () =>{
    return useContext(SocketContext);
}