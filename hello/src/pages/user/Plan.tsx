import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { IUser } from "@/@types/userType";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import ProfileNavbar from "@/components/user/ProfileNavbar";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Plan = () => {
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${userRoutes.subscribe}/${userId}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        setPlans(response.plans);
      },
    });
  }, [userId]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  const goToDetailes = async (customerId: string) => {

    doRequest({
      url: `${userRoutes.customer}/${customerId}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        window.location.href = response.url;
      },
    });
  };

  return (
    <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Plans" />
        <main className="w-full flex justify-center items-center md:p-8 p-2">
          {plans.length > 0 ? (
            <div className="relative flex flex-col items-center justify-content-center ">
              <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
                {plans.map((plan: IUserSubscribe, _index) => (
                  <div
                    key={plan._id}
                    className={
                      "relative bg-teal-500 shadow-2xl rounded-3xl p-8 border-1 border-gray-900/10 sm:p-10 "
                    }
                  >
                    <h3
                      id={plan._id}
                      className={"text-base/7 font-semibold text-white"}
                    >
                      {plan.subscriptionId.plan == "Monthly" ? `Monthly Plan` : `Yearly Plan.`}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                      <span
                        className={
                          "text-white text-5xl font-semibold tracking-tight"
                        }
                      >
                        {plan.subscriptionId.price}
                      </span>
                      <span className={"text-white text-base"}>
                        /{plan.subscriptionId.plan == "Monthly" ? `monthly` : `yearly`}
                      </span>
                    </p>

                    <ul
                      role="list"
                      className={"mt-8 space-y-3 text-sm/6 sm:mt-10 text-white"}
                    >
                      {plan.subscriptionId.description.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            aria-hidden="true"
                            className={"h-6 w-5 flex-none text-teal-400"}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      onClick={() => goToDetailes(plan.customerId)}
                      className={
                        "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-teal-500 text-white shadow-xs hover:bg-teal-400 focus-visible:outline-teal-500"
                      }
                    >
                      View plan
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[60vh] flex justify-center items-center gap-5 ">
              <strong>No Active plans</strong>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Plan);
