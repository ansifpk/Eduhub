import type { IInstructorSubscribe } from "@/@types/instructorSubscribe";
import type { IUser } from "@/@types/userType";
import AppSidebar from "../../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import type { ISubcription } from "@/@types/subscriptionType";
import { loadStripe } from "@stripe/stripe-js";

const InstructorPlans = () => {
  const { doRequest, err } = useRequest();
  const instructorId = useSelector((state: IUser) => state._id);
  const [plans, setPlans] = useState<IInstructorSubscribe[]>([]);
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);

  useEffect(() => {
    doRequest({
      url: `${instructorRoutes.subscribe}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setPlans(response.plans);
      },
    });
    doRequest({
      url: instructorRoutes.subscription,
      body: {},
      method: "get",
      onSuccess: (data) => {
        setSubscriptions(data.subscriptions);
      },
    });
  }, []);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);
   
  const subscribe = async (method: string) => {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
      
      doRequest({
        url: `${instructorRoutes.subscribe}/${method}/${instructorId}`,
        method: "get",
        body: { method, instructorId },
        onSuccess: async (res) => {
          if (res.success) {
            await stripe?.redirectToCheckout({
              sessionId: res.sessionId,
            });
          }
        },
      });
    };
  

  const goToDetailes = async (plan: IInstructorSubscribe) => {
    doRequest({
      url: `${instructorRoutes.customer}/${plan.customerId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        window.location.href = response.url;
        return;
      },
    });
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />

        <div className="p-2  text-center w-full space-y-5">
          <strong className="text-2xl underline">Your Plans</strong>
          <div className="text-end ">
            <Sheet>
              <SheetTrigger className="bg-black text-white cursor-pointer p-2 rounded">
                see subscriptions
              </SheetTrigger>
              <SheetContent side="bottom" className="h-screen">
                <SheetHeader>
                  <SheetTitle>Purchase Subscriptions</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="mx-10 p-4 border-2 rounded">
                  {subscriptions.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {subscriptions.map((subscription) => (
                        <div
                          key={subscription._id}
                          className={
                            "relative bg-gray-900 shadow-2xl rounded-3xl p-8 border-1 border-gray-900/10 sm:p-10 "
                          }
                        >
                          <h3
                            id={subscription._id}
                            className={
                              "text-base/7 font-semibold text-indigo-400"
                            }
                          >
                            {subscription.plan == "Monthly"
                              ? `Monthly Plan`
                              : `Yearly Plan.`}
                          </h3>
                          <p className="mt-4 flex items-baseline gap-x-2">
                            <span
                              className={
                                "text-white text-5xl font-semibold tracking-tight"
                              }
                            >
                              {subscription.price}
                            </span>
                            <span className={"text-gray-400 text-base"}>
                              /
                              {subscription.plan == "Monthly"
                                ? `monthly`
                                : `yearly`}
                            </span>
                          </p>
                          <p className={"mt-6 text-base/7 text-gray-300"}>
                            {subscription.description[0]}
                          </p>
                          <ul
                            role="list"
                            className={
                              "mt-8 space-y-3 text-sm/6 sm:mt-10 text-gray-300"
                            }
                          >
                            {subscription.description.map((feature) => (
                              <li key={feature} className="flex gap-x-3">
                                <CheckIcon
                                  aria-hidden="true"
                                  className={
                                    "h-6 w-5 flex-none text-indigo-400"
                                  }
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <a
                            // onClick={() => goToDetailes(subscription)}
                            onClick={() => subscribe(subscription.plan)}
                            className={
                              "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                            }
                          >
                            {plans.some(
                              (plan) =>
                                plan.subscriptionId._id == subscription._id
                            )
                              ? "Detailes"
                              : "Purchase"}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={
                        "w-full flex justify-center-safe items-center-safe text-base/7 font-semibold text-indigo-400 text-center"
                      }
                    >
                      <strong
                        className={
                          "text-base/7 font-semibold text-indigo-400 text-center"
                        }
                      >
                        No subscriptions available
                      </strong>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex gap-2 ">
            {plans.length > 0 ? (
              plans.map((value) => (
                <div
                  key={value._id}
                  className={
                    "relative bg-gray-900 shadow-2xl rounded-3xl p-8 border-1 border-gray-900/10 sm:p-10 "
                  }
                >
                  <h3
                    id={value._id}
                    className={"text-base/7 font-semibold text-indigo-400"}
                  >
                    {value.subscriptionId.plan == "Monthly"
                      ? `Monthly Plan`
                      : `Yearly Plan.`}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-x-2">
                    <span
                      className={
                        "text-white text-5xl font-semibold tracking-tight"
                      }
                    >
                      {value.subscriptionId.price}
                    </span>
                    <span className={"text-gray-400 text-base"}>
                      /
                      {value.subscriptionId.plan == "Monthly"
                        ? `monthly`
                        : `yearly`}
                    </span>
                  </p>
                  <p className={"mt-6 text-base/7 text-gray-300"}>
                    {value.subscriptionId.description[0]}
                  </p>
                  <ul
                    role="list"
                    className={
                      "mt-8 space-y-3 text-sm/6 sm:mt-10 text-gray-300"
                    }
                  >
                    {value.subscriptionId.description.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className={"h-6 w-5 flex-none text-indigo-400"}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    onClick={() => goToDetailes(value)}
                    className={
                      "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                    }
                  >
                    View Detailes
                  </a>
                </div>
              ))
            ) : (
              <div
                className={
                  "w-full flex justify-center-safe items-center-safe text-base/7 font-semibold text-indigo-400 text-center"
                }
              >
                <strong
                  className={
                    "text-base/7 font-semibold text-indigo-400 text-center"
                  }
                >
                  You dont have an active plan
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(InstructorPlans);
