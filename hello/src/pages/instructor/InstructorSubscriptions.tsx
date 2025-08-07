import type { ISubcription } from "@/@types/subscriptionType";
import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { IUser } from "@/@types/userType";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Plan from "../user/Plan";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  subscriptionSchema,
  type SubscriptionFormInputs,
} from "@/util/schemas/subscriptionScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const InstructorSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const [features] = useState([
    "Cancel at any time.",
    "Access to all courses of this instructor.",
  ]);
  const instructorId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionFormInputs>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      price: "",
      method: [],
    },
  });

  useEffect(() => {
    doRequest({
      url: `${instructorRoutes.subscription}/${instructorId}`,
      body: {},
      method: "get",
      onSuccess: (data) => {
        setSubscriptions(data.subscriptions);
      },
    });
    

  }, []);
 
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

  const goToDetailes = async (customerId: string) => {
    doRequest({
      url: `${instructorRoutes.customer}/${customerId}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        console.log("response.url", response.url);
        window.location.href = response.url;
      },
    });
  };

  const handleCreate = (data: SubscriptionFormInputs) => {
    console.log("data", data);
    doRequest({
      url: `${instructorRoutes.subscription}/${instructorId}`,
      method: "post",
      body: {
        price: parseInt(data.price),
        plan: data.method[0],
        description: features,
      },
      onSuccess: () => {
        toast.success("Succesfully created");
        // return navigate(-1);
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />

        <div className="p-2  text-center w-full space-y-5">
          <div>
            {subscriptions.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {subscriptions.map((value) => (
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
                      {value.plan == "Monthly"
                        ? `Monthly Plan`
                        : `Yearly Plan.`}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                      <span
                        className={
                          "text-white text-5xl font-semibold tracking-tight"
                        }
                      >
                        {value.price}
                      </span>
                      <span className={"text-gray-400 text-base"}>
                        /{value.plan == "Monthly" ? `monthly` : `yearly`}
                      </span>
                    </p>
                    <p className={"mt-6 text-base/7 text-gray-300"}>
                      {value.description[0]}
                    </p>
                    <ul
                      role="list"
                      className={
                        "mt-8 space-y-3 text-sm/6 sm:mt-10 text-gray-300"
                      }
                    >
                      {value.description.map((feature) => (
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
                      onClick={() =>
                        plans.find(
                          (plan) => plan.subscriptionId._id == value._id
                        )
                          ? goToDetailes(
                              plans.find(
                                (plan) => plan.subscriptionId._id == value._id
                              )?.customerId as string
                            )
                          : subscribe(value.plan)
                      }
                      className={
                        "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                      }
                    >
                      {plans.some(
                        (plan) => plan.subscriptionId._id == value._id
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
                  "w-full flex justify-center-safe items-center-safe  font-semibold text-indigo-400 text-center"
                }
              >
                <strong
                  className={
                    "text-base/7 font-semibold text-indigo-400 text-center"
                  }
                >
                  You dont have a subscription
                </strong>
              </div>
            )}
          </div>
          <Dialog>
            <form>
              <DialogTrigger className="bg-purple-600 text-white p-2 rounded cursor-pointer">
                Create new Subscription
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Subscription</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <div>
                    <form
                      onSubmit={handleSubmit(handleCreate)}
                      className="space-y-5"
                    >
                      <div className="flex flex-col">
                        <label htmlFor="price" className="font-semibold">
                          Price
                        </label>
                        <input
                          type="text"
                          {...register("price")}
                          placeholder="Enter price"
                          className="border border-purple-600 p-2 rounded"
                        />
                        {errors.price && (
                          <p className="text-red-500">{errors.price.message}</p>
                        )}
                      </div>
                      <div className="space-x-5">
                        <label htmlFor="price" className="font-semibold">
                          Plan method
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="method"
                            {...register("method")}
                            value="Monthly"
                            checked={watch("method")[0] == "Monthly"}
                            onChange={(e) =>
                              setValue("method", [e.target.value])
                            }
                            className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                          />
                          <label
                            htmlFor="method1"
                            className="text-sm font-medium text-gray-700"
                          >
                            Monthly
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="method"
                            {...register("method")}
                            value="Yearly"
                            checked={watch("method")[0] == "Yearly"}
                            onChange={(e) =>
                              setValue("method", [e.target.value])
                            }
                            className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                          />
                          <label
                            htmlFor="method1"
                            className="text-sm font-medium text-gray-700"
                          >
                            Yearly
                          </label>
                        </div>
                        {errors.method && (
                          <p className="text-red-500">
                            {errors.method.message}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end gap-5">
                        <button
                          className="bg-purple-600 text-white p-2 rounded cursor-pointer"
                          type="button"
                          //   onClick={() => navigate(-1)}
                        >
                          Cancel
                        </button>
                        <Dialog>
                          <DialogTrigger className="bg-purple-600 text-white p-2 rounded cursor-pointer">
                            Create
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                Are you absolutly sure you want to create this
                                subscription? this action cannot be un done.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <button
                                  type="button"
                                  className="bg-purple-500 hover:bg-purple-500"
                                >
                                  Cancel
                                </button>
                              </DialogClose>
                              <DialogClose asChild>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSubmit(handleCreate)();
                                  }}
                                  className="bg-purple-500 hover:bg-purple-500"
                                >
                                  Continue
                                </button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default React.memo(InstructorSubscriptions);
