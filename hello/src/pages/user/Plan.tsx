import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { IUser } from "@/@types/userType";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import ProfileNavbar from "@/components/user/ProfileNavbar";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Plan = () => {
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const userId = useSelector((state: IUser) => state._id);
  
  const { doRequest, err } = useRequest();
  console.log("wuehiu")

  useEffect(() => {
    doRequest({
      url: `${userRoutes.subscribe}/${userId}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        console.log('response',response);
        setPlans(response.plans);
      },
    });
  }, [userId]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  
  const goToDetailes = async(plan:IUserSubscribe)=>{
     doRequest({
      url:`${userRoutes.customer}/${plan.customerId}`,
      body:{},
      method:"get",
      onSuccess:(response)=>{
          window.location.href = response.url
      }
     });
  }

  

  return (
    <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Plans" />
        <main className="w-full flex justify-center items-center md:p-8 p-2">
          {plans.length > 0 ? (
            <div className="relative flex flex-col items-center justify-content-center ">
              <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
                {plans.map((plan: IUserSubscribe, index) => (
                  <div
                    key={index}
                    className="border w-full h-[300px] rounded p-2 border-teal-400 cursor-pointer "
                  >
                    <h4 className=" underline">Personal Plan</h4>
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
                          {plan.subscriptionId.description.map((val, ind) => (
                            <li className="text-xs" key={ind}>
                              {val}
                            </li>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end ">
                        <button
                          onClick={() => goToDetailes(plan)}
                          type="button"
                          className="w-full rounded p-1 font-semibold bg-teal-500 hover:bg-teal-300 text-white"
                        >
                          View plan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[60vh] flex justify-center items-center gap-5 ">
              <strong>No Active plans</strong>
              <button
                // onClick={() => navigate("/user/courses")}
                className="text-indigo-700 cursor-pointer underline font-bold"
              >
                Purchase plan
              </button>
            </div>
          )}

          
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Plan);
