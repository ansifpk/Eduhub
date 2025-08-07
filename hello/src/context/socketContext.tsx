
import type { IUser } from "@/@types/userType";
import { removeUser } from "../redux/authSlice";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";


import.meta.env.VITE_APIGATEWAY

const SocketContext = createContext<Socket|null>(null);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [socket,setSocket] = useState<Socket|null>(null);
    const userId = useSelector((state:IUser)=>state._id);
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(userId){
            const newSocket = io(import.meta.env.VITE_APIGATEWAY,{
                path: '/auth/auth/socket.io',
                query:{
                    userId
                }
            })
            setSocket(newSocket);
            newSocket.on(`block:${userId}`,()=>{
              toast.error("Access blocked by Admin")
              dispatch(removeUser())
              navigate("/users/login");
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

