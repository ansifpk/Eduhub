import { User } from '@/@types/userType'
import { createOrder } from '@/Api/user'
import Header from '@/Components/Header/Header'
import { Button } from '@/Components/ui/button'
import axios from 'axios'
import { log } from 'console'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
    // const user = useSelector((state:User)=>state) 

    // const bodyData = localStorage.getItem("bodyDatas");
    // useEffect(()=>{
    //    const call = async()=>{
    //     if(bodyData){
    //         const obj = JSON.parse(bodyData)
    //         obj.user  = user
    //         const data = await createOrder(obj)
            
    //         if(data.success){
    //           console.log(data,"idh");
    //           localStorage.setItem("bodyDatas","");
    //         }
    //     }
    //    }
    //    call();
    // },[bodyData])
  return (
    <>
    <Header />
    <div className=' h-[100vh] bg-blue-200 flex justify-center items-center'>
    <div className='w-25 h-25  rounded-2 flex flex-col justify-center items-center bg-green-400'>
       <h3>Purchase successfully</h3>
      <Button onClick={()=>navigate("/users/courses")}>Go home</Button>
    </div>
    </div>
    </>
    
  )
}

export default Success
