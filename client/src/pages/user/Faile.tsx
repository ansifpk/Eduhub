import Header from '@/Components/Header/Header'
import { Button } from '@/Components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Faile = () => {
    const navigate = useNavigate()
  return (
    <>
    <Header />
    <div className=' h-[100vh] bg-blue-200 flex justify-center items-center'>
    <div className='w-25 h-25  rounded-2 flex flex-col justify-center items-center bg-red-400'>
       <h3>Purchase successfully</h3>
      <Button onClick={()=>navigate("/user/courses")}>Go home</Button>
    </div>
    </div>
    </>
  )
}

export default Faile
