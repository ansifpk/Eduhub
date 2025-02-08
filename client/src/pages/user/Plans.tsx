import { IUserSubscribe } from '@/@types/userSubscribe'
import { User } from '@/@types/userType'
import { userPlans, viewDetailes } from '@/Api/user'
import Footer from '@/Components/Footer/Footer'
import Header from '@/Components/Header/Header'
import ProfileNavbar from '@/Components/Header/ProfileNavbar'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription } from '@/Components/ui/card'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Plans = () => {
    const [plans,setPlans] = useState<IUserSubscribe[]>([]);
    const userId = useSelector((state:User)=>state.id)
    useEffect(()=>{
      const fetching = async () => {
        const plans = await userPlans(userId!);
        if (plans.success) {
            setPlans(plans.plans);
        } else {
            return toast.error(plans.response.data.message);
        } 
      }
      fetching();
    },[])
    
    const navigate = useNavigate();

    const goToDetailes = async(plan:IUserSubscribe)=>{
        const response = await viewDetailes(plan.customerId);
        if(response.success){
          window.location.href = response.url;
         return 
        }else if(response.status == 403){
          toast.error(response.response.data.message);
          return navigate('/instructor/login');
        }else{
         return toast.error(response.response.data.message)
        }
     }

  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <main className="w-full mx-auto">
        {plans.length > 0 ? (
          <div className="relative flex flex-col items-center justify-content-center ">
            <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
              {plans.map((plan: IUserSubscribe,index) => (
                 <div
                 key={index}
                 className="border w-full h-[300px] rounded-1"
               >
                 <h4 className=" underline">
                   Personal Plan
                 </h4>
                 <div className="  m-1">
                   <div className="flex flex-col items-center justify-center h-[210px]">
                     <div>
                       {plan.subscriptionId.plan == "Monthly"
                         ? `Rs : ${plan.subscriptionId.price}/- per Month`
                         : `Rs : ${plan.subscriptionId.price}/- per Year`}
                     </div>
                     <div className="text-xs">
                       {plan.subscriptionId.plan == "Monthly"
                         ? `Billed monthly.`
                         : `Billed annually.`}
                     </div>
                     <div className="space-y-3 m-3">
                       {plan.subscriptionId.description.map(
                         (val, ind) => (
                           <li
                             className="text-xs"
                             key={ind}
                           >
                             {val}
                           </li>
                         )
                       )}
                     </div>
                   </div>
                   <div className="flex items-end ">
                     <Button
                       onClick={() =>
                         goToDetailes(plan)
                       }
                       type="button"
                       className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                     >
                       View plan
                     </Button>
                   </div>
                 </div>
               </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className=" h-full flex justify-center items-center">
              <Card className="w-1/2 h-[200px] d-flex justify-center items-center">
                <CardContent className="d-flex items-center">
                  <CardDescription>No courses available</CardDescription>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Plans
