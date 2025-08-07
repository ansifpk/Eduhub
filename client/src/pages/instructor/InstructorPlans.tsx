import { IInstructorSubscribe } from '../../@types/instructorSubscribe'
import { User } from '../../@types/userType'
import InstructorAside from '../../components/instructor/InstructorAside'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import useRequest from '../../hooks/useRequest'
import instructorRoutes from '../../service/endPoints/instructorEndPoints'

const InstructorPlans = () => {
  const [plans,setPlans] = useState<IInstructorSubscribe[]>([]);
  const instructorId = useSelector((state:User)=>state.id);
  const {doRequest,errors} = useRequest();
  useEffect(()=>{
    doRequest({
      url:`${instructorRoutes.subscribe}/${instructorId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setPlans(response.plans);
      }
    });
  },[]);

  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message));
  },[errors])

  const goToDetailes = async(plan:IInstructorSubscribe)=>{
    doRequest({
      url: `${instructorRoutes.customer}/${plan.customerId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        window.location.href = response.url;
        return ;
      }
    });
  }
  return (
    <div className="bg-black h-screen">
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
              <div key={ind} className='border w-50 h-[300px] rounded-1' >
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
                       <Button onClick={()=>goToDetailes(value)}  type='button' className='w-full bg-white hover:bg-white cursor-pointer text-black'   >View Plan</Button>
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
