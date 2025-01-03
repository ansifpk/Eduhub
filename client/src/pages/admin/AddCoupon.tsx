import AdminAside from "@/Components/admin/AdminAside";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
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
} from "@/Components/ui/alert-dialog";


import { addCoupon } from "@/Api/admin";

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
  const [errors, setErrors] = useState({
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

  const handleCategory = async () => {
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

    const respose = await addCoupon(
      title,
      description,
      offer,
      startingDate,
      startingTime,
      expiryDate,
      expiryTime,
      couponId
    );
    if (respose.success) {
      toast.success(" Coupone added");
      return navigate("/admin/coupon");
    } else {
      toast.error(respose.response.data.message);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <AdminAside />
        <div className="col-md-10">
          <div className="welcome mt-4 mb-4 bg-purple-600">
            <h1>Welcome back, Admin</h1>
            <img
              src="https://via.placeholder.com/50"
              alt="Profile Picture"
              className="profile-pic"
            />
          </div>
          <div className="grid grid-cols-1">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
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
                          className={errors.title ? "text-danger" : ""}
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
                        {errors.title ? (
                          <p className="text-danger font-medium text-xs text-muted-foreground">
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
                        className={errors.description ? "text-danger" : ""}
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
                      {errors.description ? (
                        <p className="text-danger font-medium text-xs text-muted-foreground">
                          Description length should be in between 3 and 50.
                        </p>
                      ) : (
                        <p className="font-medium text-xs text-muted-foreground">
                          enter coupon Description here.Description length
                          should be in between 3 and 50.
                        </p>
                      )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <div className="space-4">
                        <div className="w-full max-w-sm items-center space-x-2">
                          <Label
                            className={
                              errors.offer ? "text-danger" : "text-black"
                            }
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
                          {errors.offer ? (
                            <p className="text-danger font-medium text-xs text-muted-foreground">
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
                                errors.statringDate
                                  ? "text-danger "
                                  : "text-black"
                              }
                            >
                              Starting Date
                            </Label>
                            <Input
                              value={startingDate}
                              className={
                                errors.statringDate
                                  ? "border text-danger border-danger"
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
                                  errors.startingTime
                                    ? " text-danger "
                                    : " text-black"
                                }
                              >
                                starting time
                              </Label>
                              <Input
                                className={
                                  errors.startingTime
                                    ? "border border-danger "
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
                                errors.expiryDate
                                  ? "text-danger "
                                  : "text-black"
                              }
                            >
                              Expiring Date
                            </Label>
                            <Input
                              value={expiryDate}
                              className={
                                errors.expiryDate
                                  ? "text-danger "
                                  : "text-black"
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
                                  errors.expiryTime
                                    ? "text-danger"
                                    : "text-black"
                                }
                              >
                                Expiring Time
                              </Label>
                              <Input
                                type="time"
                                className={
                                  errors.expiryTime
                                    ? "border border-danger "
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
                              errors.couponCode ? "text-danger" : "text-black"
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
                          {errors.couponCode ? (
                            <p className="text-danger font-medium text-xs text-muted-foreground">
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
                  <div className="d-flex justify-content-center gap-10">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Back</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You cannot retrieve the informations you entered
                            now. All will remove permenently
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
                          className="bg-teal-500 hover:bg-teal-500"
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
                            onClick={handleCategory}
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
    </div>
  );
};

export default AdminAddCoupon;
