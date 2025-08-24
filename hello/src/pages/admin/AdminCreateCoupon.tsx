import {
  couponSchema,
  type CouponFormInputs,
} from "@/util/schemas/couponSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import useRequest from "@/hooks/useRequest";

const AdminCreateCoupon = () => {
  const {doRequest,err} = useRequest();
  const [loading,setLoading]= useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormInputs>({
    resolver: zodResolver(couponSchema),
  });

  const handleCreate = (data: CouponFormInputs) => {
  
     doRequest({
          url: adminRoutes.coupon,
          method: "post",
          body: {
            title:data.title,
            description:data.description,
            offer:data.offer,
            startingDate:data.startingDate,
            expiryDate:data.expiryDate,
            couponCode: data.couponCode,
          },
          onSuccess: () => {
            setLoading(false)
            toast.success(" Coupone added");
            return navigate("/admin/coupon");
          },
        });
  };
  
  useEffect(()=>{
     setLoading(false)
    err?.map((err)=>toast.error(err.message));
  },[err]);
  
  return (
    <div className="w-[80%] ml-auto">
      <div className="px-5 flex flex-col space-y-5">
        <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="font-bold text-3xl">Welcome back, Admin</span>
        </div>
        <div>
          <strong>Create Coupon</strong>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className=" mx-auto border grid grid-cols-2 p-2 gap-4">
              <div className="space-y-3">
                <div className="grid grid-row ">
                  <label htmlFor="title">Title</label>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="enter title"
                    className="border-purple-600 rounded border p-2"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div className="grid grid-row">
                  <label htmlFor="Description">Description</label>
                  <input
                    {...register("description")}
                    type="textarea"
                    placeholder="enter decription"
                    className="border-purple-600 rounded border h-[150px] p-2"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-row">
                  <label htmlFor="Offer">Offer</label>
                  <input
                    {...register("offer")}
                    type="number"
                    placeholder="enter title"
                    className="border-purple-600 rounded border p-2"
                  />
                  {errors.offer && (
                    <p className="text-red-500">{errors.offer.message}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <div className="grid grid-row">
                    <label htmlFor="Starting Date">Starting Date</label>
                    <input
                      {...register("startingDate")}
                      type="datetime-local"
                      placeholder="enter decription"
                      className="border-purple-600 rounded border p-2"
                    />
                    {errors.startingDate && (
                      <p className="text-red-500">
                        {errors.startingDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-row">
                    <label htmlFor="Ending Date">Ending Date</label>
                    <input
                      {...register("expiryDate")}
                      type="datetime-local"
                      placeholder="enter decription"
                      className="border-purple-600 rounded border p-2"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-row">
                  <label htmlFor="Coupon code">Coupon code</label>
                  <input
                    {...register("couponCode")}
                    type="text"
                    placeholder="enter Coupon code"
                    className="border-purple-600 rounded border p-2"
                  />
                  {errors.couponCode && (
                    <p className="text-red-500">{errors.couponCode.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 ">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="bg-purple-500 text-white rounded p-2 cursor-pointer ">
                    cancel
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will discard all the
                      datas you provided.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-purple-500 text-white rounded cursor-pointer ">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      
                      className="bg-purple-500 text-white rounded  cursor-pointer "
                      onClick={() => navigate(-1)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger disabled={loading} asChild>
                  <button disabled={loading} className="bg-purple-500 text-white rounded p-2 cursor-pointer ">
                    confirm
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permenantly save
                      all the datas you provided.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-purple-500 text-white rounded  cursor-pointer ">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-purple-500 text-white rounded cursor-pointer "
                      onClick={() => handleSubmit(handleCreate)()}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminCreateCoupon);
