import { IInstructorSubscribe } from '@/@types/instructorSubscribe'
import { User } from '@/@types/userType'
import { instructorPlans, viewDetailes,  } from '@/Api/instructor'
import InstructorAside from '@/Components/instructor/InstructorAside'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'

const InstructorPlans = () => {
  const [plans,setPlans] = useState<IInstructorSubscribe[]>([]);
  const instructorId = useSelector((state:User)=>state.id);
const navigate = useNavigate()
  useEffect(()=>{
    const fetching = async () => {
       const response = await instructorPlans(instructorId)
      
       
       if(response.success){
        setPlans(response.plans);
        return 
       }else if(response.status == 403){
         toast.error(response.response.data.message)
         return navigate('/instructor/login')
       }else{
        return toast.error(response.response.data.message)
       }
    }
    fetching()
  },[]);
  const goToDetailes = async(plan:IInstructorSubscribe)=>{
     const response = await viewDetailes(plan.customerId);
     if(response.success){
       window.location.href = response.url;
      return 
     }else if(response.status == 403){
       toast.error(response.response.data.message)
       return navigate('/instructor/login')
     }else{
      return toast.error(response.response.data.message)
     }
  }
  return (
    <div className="bg-black ">
    <div className="hidden space-y-6 p-10 pb-16 md:block">
    <div className="flex items-center justify-between space-y-2">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0">
            <InstructorAside  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
        <div className="flex-1 lg:max-w-full md:max-w-full">
        <div className=" lg:space-x-12 lg:space-y-0">
           {
           plans.length>0?(
            plans.map((value,ind)=>(
              <div key={ind} className='border w-25 h-[300px] rounded-1' >
                  <h4 className='text-white underline'>Personal Plan</h4>
                  <div className=' text-white m-1'>
                   <div className='flex flex-col items-center justify-center h-[210px]'>
                   <div >
                       {value.subscriptionId.plan == "Monthly"?`Rs : ${value.subscriptionId.price}/- per Month`:`Rs : ${value.subscriptionId.price}/- per Year`}
                     </div>
                      <div className='text-xs'>
                      {value.subscriptionId.plan == "Monthly"?`Billed monthly.`:`Billed annually.`}
                      </div>
                      <div className='space-y-3 m-3'>
                        {value.subscriptionId.description.map((val,index)=>(
                          <li className='text-xs' key={index}>{val}</li>
                        ))}
                   </div>
                      </div>
                      <div className='flex items-end '>
                       <Button onClick={()=>goToDetailes(value)}  type='button' className='w-full bg-white text-black'   >View Plan</Button>
                      </div>
                     </div>
              </div>
             ))
           ):(
              <div  className='flex items-center justify-center' >
                  <h4 className='text-white underline'>You dont have an active Plan</h4>
              </div>

           )
           }
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InstructorPlans
