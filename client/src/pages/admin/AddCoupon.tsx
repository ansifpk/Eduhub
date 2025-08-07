import AdminAside from "../../components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";

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
} from "../../components/ui/alert-dialog";
import useRequest from "../../hooks/useRequest";
import adminRoutes from "../../service/endPoints/adminEndPoints";

const AdminAddCoupon: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [offer, setOffer] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [couponId, setCouponId] = useState("");
  const [today] = useState(new Date());
  const { doRequest, errors } = useRequest();
  const [error, setErrors] = useState({
    title: false,
    description: false,
    offer: false,
    couponCode: false,
    statringDate: false,
    expiryDate: false,
    startingTime: false,
    expiryTime: false,
  });

  const navigate = useNavigate();
useEffect(()=>{
  errors?.map((err)=>toast.error(err.message))
},[errors])
  const handleCoupon = async () => {
    console.log("ji");
    
    if (title.length < 3 || title.length > 20) {
      setErrors((prev) => ({
        ...prev,
        title: true,
      }));
      return;
    }

    if (description.length < 3 || description.length > 50) {
      setErrors((prev) => ({
        ...prev,
        description: true,
      }));

      return;
    }

    if (offer < 20 || offer > 70) {
      setErrors((prev) => ({
        ...prev,
        offer: true,
      }));

      return;
    }
    if (new Date(startingDate) < today || startingDate.length == 0) {
      setErrors((prev) => ({
        ...prev,
        statringDate: true,
      }));

      return;
    }
    if (
      expiryDate < startingDate ||
      new Date(expiryDate) < today ||
      startingDate.length == 0
    ) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: true,
      }));
      return;
    }

    if (startingTime.length == 0) {
      setErrors((prev) => ({
        ...prev,
        startingTime: true,
      }));
      return;
    }

    if (expiryTime.length < 1 || startingTime >= expiryTime) {
      setErrors((prev) => ({
        ...prev,
        expiryTime: true,
      }));
      return;
    }

    if (couponId.length < 5 || couponId.length > 10) {
      setErrors((prev) => ({
        ...prev,
        couponCode: true,
      }));
      return;
    }
    doRequest({
      url: adminRoutes.coupon,
      method: "post",
      body: {
        title,
        description,
        offer,
        startingDate,
        startingTime,
        expiryDate,
        expiryTime,
        couponCode: couponId,
      },
      onSuccess: () => {
        toast.success(" Coupone added");
        return navigate("/admin/coupon");
      },
    });
  };
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors])
  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-2">
      <div className="w-full mx-auto mt-2 rounded-lg p-5  text-white bg-purple-600">
          <span className="text-3xl">Welcome back, Admin</span>
        </div>
        <div className="w-full flex justify-center">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Add New Coupon</h2>
              </div>
            </CardHeader>
            <CardContent>
              <form>
                <div className="d-flex justify-content-between">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div>
                      <Label
                        htmlFor="Title"
                        className={error.title ? "text-red-500" : ""}
                      >
                        Title
                      </Label>
                      <Input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                          if (
                            e.target.value.length >= 3 &&
                            e.target.value.length <= 20
                          ) {
                            setErrors((prev) => ({
                              ...prev,
                              title: false,
                            }));
                          }
                          setTitle(e.target.value);
                        }}
                        id="Title"
                        placeholder="Title"
                      />
                      {error.title ? (
                        <p className="text-red-500 font-medium text-xs ">
                          Title length should be in between 3 and 20.
                        </p>
                      ) : (
                        <p className="font-medium text-xs text-muted-foreground">
                          enter coupon title here.title length should be in
                          between 3 and 20.
                        </p>
                      )}
                    </div>

                    <Label
                      htmlFor="Deacription"
                      className={error.description ? "text-red-500" : ""}
                    >
                      Deacription
                    </Label>
                    <Textarea
                      value={description}
                      required
                      onChange={(e) => {
                        if (
                          e.target.value.length >= 3 &&
                          e.target.value.length <= 50
                        ) {
                          setErrors((prev) => ({
                            ...prev,
                            description: false,
                          }));
                        }
                        setDiscription(e.target.value);
                      }}
                      maxLength={100}
                      placeholder="Add your Deacription here."
                    />
                    {error.description ? (
                      <p className="text-red-500 font-medium text-xs ">
                        Description length should be in between 3 and 50.
                      </p>
                    ) : (
                      <p className="font-medium text-xs text-muted-foreground">
                        enter coupon Description here.Description length should
                        be in between 3 and 50.
                      </p>
                    )}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div className="space-4">
                      <div className="w-full max-w-sm items-center space-x-2">
                        <Label
                          className={error.offer ? "text-red-500" : "text-black"}
                        >
                          Offer
                        </Label>
                        <Input
                          type="number"
                          value={offer}
                          onChange={(e) => {
                            if (
                              parseInt(e.target.value) >= 20 &&
                              parseInt(e.target.value) <= 70
                            ) {
                              setErrors((prev) => ({
                                ...prev,
                                offer: false,
                              }));
                            }
                            setOffer(parseInt(e.target.value));
                          }}
                          placeholder="Offer"
                        />
                        {error.offer ? (
                          <p className="text-red-500 font-medium text-xs ">
                            Offer should be in between 20% and 70%.
                          </p>
                        ) : (
                          <p className="font-medium text-xs text-muted-foreground">
                            enter coupon Offer here.Offer should be in between
                            20% and 70%.
                          </p>
                        )}
                      </div>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <div className="space-y-1">
                          <Label
                            className={
                              error.statringDate ? "text-red-500 " : "text-black"
                            }
                          >
                            Starting Date
                          </Label>
                          <Input
                            value={startingDate}
                            className={
                              error.statringDate
                                ? "border text-red-500 border-red-500"
                                : "text-black"
                            }
                            type="date"
                            onChange={(e) => {
                              if (new Date(e.target.value) > today) {
                                setErrors((prev) => ({
                                  ...prev,
                                  statringDate: false,
                                }));
                              }
                              setStartingDate(e.target.value);
                            }}
                          />
                          <div>
                            <Label
                              className={
                                error.startingTime
                                  ? " text-red-500 "
                                  : " text-black"
                              }
                            >
                              starting time
                            </Label>
                            <Input
                              className={
                                error.startingTime
                                  ? "border border-red-500 "
                                  : "border border-black"
                              }
                              type="time"
                              onChange={(e) => {
                                if (e.target.value.length > 0) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    startingTime: false,
                                  }));
                                }
                                setStartingTime(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label
                            className={
                              error.expiryDate ? "text-red-500 " : "text-black"
                            }
                          >
                            Expiring Date
                          </Label>
                          <Input
                            value={expiryDate}
                            className={
                              error.expiryDate ? "text-red-500 " : "text-black"
                            }
                            type="date"
                            onChange={(e) => {
                              if (new Date(e.target.value) > today) {
                                setErrors((prev) => ({
                                  ...prev,
                                  expiryDate: false,
                                }));
                              } else if (expiryDate > startingDate) {
                                setErrors((prev) => ({
                                  ...prev,
                                  expiryDate: false,
                                }));
                              }
                              setExpiryDate(e.target.value);
                            }}
                          />
                          <div>
                            <Label
                              className={
                                error.expiryTime ? "text-red-500" : "text-black"
                              }
                            >
                              Expiring Time
                            </Label>
                            <Input
                              type="time"
                              className={
                                error.expiryTime
                                  ? "border border-red-500 "
                                  : "border border-black"
                              }
                              onChange={(e) => {
                                if (e.target.value > startingTime) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    expiryTime: false,
                                  }));
                                }
                                setExpiryTime(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full max-w-sm items-center space-x-2">
                        <Label
                          className={
                            error.couponCode ? "text-red-500" : "text-black"
                          }
                        >
                          coupon code
                        </Label>
                        <Input
                          type="text"
                          value={couponId}
                          onChange={(e) => {
                            if (
                              e.target.value.length >= 5 &&
                              e.target.value.length <= 10
                            ) {
                              setErrors((prev) => ({
                                ...prev,
                                couponCode: false,
                              }));
                            }
                            setCouponId(e.target.value.trim());
                          }}
                          placeholder="enter coupon ID"
                        />
                        {error.couponCode ? (
                          <p className="text-red-500 font-medium text-xs ">
                            Coupon ID length should be in between 50 and 10.
                          </p>
                        ) : (
                          <p className="font-medium text-xs text-muted-foreground">
                            enter coupon ID here.Coupon ID length should be in
                            between 50 and 10.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-10">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-purple-600 text-white hover:bg-purple-600">
                        Back
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You cannot retrieve the informations you entered now.
                          All will remove permenently
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          className="bg-black text-white"
                          type="button"
                        >
                          Cancel
                        </AlertDialogAction>
                        <AlertDialogAction
                          className="bg-black text-white"
                          type="button"
                          onClick={() => navigate(-1)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        className="bg-purple-600 text-white hover:bg-purple-600"
                      >
                        create
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permenently dave this info to the
                          database. and this data is show to the users
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-black text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-black text-white"
                          onClick={handleCoupon}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCoupon;
