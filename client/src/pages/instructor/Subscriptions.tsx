import { ISubcription } from '@/@types/subscriptionType'
import { User } from '@/@types/userType'
import { getSubscriptions, purchaseSubscription } from '@/Api/instructor'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { loadStripe } from '@stripe/stripe-js'
import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Subscriptions = () => {
    const [subscriptions,setSubscriptions] = useState<ISubcription[]>([]);
    const instructorId  = useSelector((state:User)=>state.id);
    useEffect(()=>{
      const fetching = async () => {
        const response = await getSubscriptions();
        if(response.success){
            setSubscriptions(response.subscriptions)
        }
      }
      fetching();
    },[])
   console.log("subs",subscriptions)
    const subscribe = async(method:string)=>{
         const stripe = await loadStripe(
            import.meta.env.VITE_PUBLISH_SECRET 
        );
        const response = await purchaseSubscription(method,instructorId)
        
        if(response.success){
            await stripe?.redirectToCheckout({
                sessionId: response.sessionId,
              });
            
        }else{
          return toast.error(response.response.data.message);
        }
    }
  return (
    <div className="bg-black h-[100vh]">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">Edu Hub</h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-center lg:flex-row lg:space-x-12 lg:space-y-0">
           {subscriptions.map((value,ind)=>(
            <div key={ind} className='border w-25 h-[300px] rounded-1' >
                <h4 className='text-white underline'>Personal Plan</h4>
                <div className=' text-white m-1'>
                 <div className='flex flex-col items-center justify-center h-[210px]'>
                 <div >
                     {value.plan == "Monthly"?`Rs : ${value.price}/- per Month`:`Rs : ${value.price}/- per Year`}
                   </div>
                    <div className='text-xs'>
                    {value.plan == "Monthly"?`Billed monthly.`:`Billed annually.`}
                    </div>
                    <div className='space-y-3 m-3'>
                      {value.description.map((val,index)=>(
                        <li className='text-xs' key={index}>{val}</li>
                      ))}
                 </div>
                    </div>
                    <div className='flex items-end '>
                     <Button onClick={()=>subscribe(value.plan)} type='button' className='w-full bg-white text-black'   >Start Subscription</Button>
               
                    </div>
                   </div>
            </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default Subscriptions
