import type { ICart } from "@/@types/cartType";
import type { ICourse } from "@/@types/courseType";
import type { IInstructorRating } from "@/@types/instructorRatingType";
import type { ISubcription } from "@/@types/subscriptionType";
import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { IUser } from "@/@types/userType";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ratingScheema,
  type RatingFormInputs,
} from "@/util/schemas/ratingScheema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import type { IUserProfile } from "@/@types/userProfile";
const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const InstructorProfile = () => {
  const { err, doRequest } = useRequest();
  const { instructorId } = useParams();
  const userId = useSelector((state: IUser) => state._id);
  const [user, setUser] = useState<IUserProfile>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [cart, setCart] = useState<ICart>();
  const [reviews, setReviews] = useState<IInstructorRating[]>([]);
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const navigate = useNavigate();
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [seeMoreEditAlertOpen, setSeeMoreEditAlertOpen] = useState(false);
  const [seeMoreAlertOpen, setSeeMoreAlertOpen] = useState(false);
  const [addOpenAlert, setAddOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RatingFormInputs>({
    resolver: zodResolver(ratingScheema),
    defaultValues: {
      rating: "",
      star: 1,
    },
  });

  useEffect(() => {
    doRequest({
      url: `${userRoutes.profile}?userId=${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setUser(res.userData);
      },
    });

    doRequest({
      url: `${userRoutes.fetchCourses}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        console.log(res.courses);
        setCourses(res.courses);
      },
    });
    doRequest({
      url: `${userRoutes.Cart}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setCart(data.cart);
      },
    });
    doRequest({
      url: `${userRoutes.instructorRating}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setReviews(res.ratings);
      },
    });
    doRequest({
      url: `${userRoutes.subscriptions}/${instructorId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        console.log("subscriptuin", res.subscriptions);

        setSubscriptions(res.subscriptions);
      },
    });
    doRequest({
      url: `${userRoutes.plans}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setPlans(res.plans);
      },
    });
  }, [instructorId]);

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  const handleCart = (_id: string) => {};

  const handleAddReport = (data: RatingFormInputs) => {
    setLoading(true);
    doRequest({
      url: `${userRoutes.instructorRating}`,
      method: "post",
      body: { instructorId, userId, review: data.rating, stars: data.star },
      onSuccess: async () => {
        doRequest({
          url: `${userRoutes.instructorRating}/${instructorId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setValue("star", 1);
            setValue("rating", "");
            setLoading(false);
            setReviews(response.ratings);
            setAddOpenAlert(false);
            return toast.success("instrutcor rated succesfuly...");
          },
        });
      },
    });
  };

  const editRating = (data: RatingFormInputs, ratingId: string) => {
    setLoading(true);
    doRequest({
      url: userRoutes.instructorRating,
      body: { ratingId, review: data.rating, stars: data.star },
      method: "patch",
      onSuccess: async () => {
        await doRequest({
          url: `${userRoutes.instructorRating}/${instructorId}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setReviews(ratings.ratings);
            setValue("rating", "");
            setValue("star", 1);
            setLoading(false);
            setEditAlertOpen(false);
            setSeeMoreEditAlertOpen(false);
            return toast.success("Review edit successfully..");
          },
        });
      },
    });
  };

  const handleDeleteRating = (ratingId: string) => {
    doRequest({
      url: `${userRoutes.instructorRating}/${ratingId}`,
      method: "delete",
      body: {},
      onSuccess: async () => {
        doRequest({
          url: `${userRoutes.instructorRating}/${instructorId}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setReviews(ratings.ratings);
            toast.success("Review deleted successfully..");
          },
        });
      },
    });
  };

  const goToDetailes = async (customerId: string) => {
    await doRequest({
      url: `${userRoutes.customer}/${customerId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        return (window.location.href = response.url);
      },
    });
  };

  const subscribe = async (subscriptionId: string) => {
    await doRequest({
      url: `${userRoutes.subscriptions}/${subscriptionId}`,
      body: { userId },
      method: "post",
      onSuccess: async (response) => {
        await stripe?.redirectToCheckout({
          sessionId: response.sessionId,
        });
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="flex gap-2">
          <Avatar className=" rounded-full h-48 w-48">
            <AvatarImage src={user?.avatar.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className=" flex border-2 drop-shadow-lg  w-full p-2 rounded border-teal-400">
            <div className="space-y-10">
              <span className="font-semibold">Name : </span>
              <span>{user?.name}</span>
              <div>
                <span className="font-semibold">About me : </span>
                {user?.about}
              </div>
              <div>
                <i className="bi bi-star-fill text-yellow-600"></i>2 instructor
                Ratings
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultValue="Courses" className="w-full my-5">
            <TabsList className="grid bg-teal-400 w-full grid-cols-3">
              <TabsTrigger value="Courses">Courses</TabsTrigger>
              <TabsTrigger value="Reviews">Reviews</TabsTrigger>
              <TabsTrigger value="Subscriptions">Subscriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="Courses">
              <div className="mx-3">
                <div>
                  <ScrollArea>
                    <div className="relative flex">
                      <div className="flex  mx-5 my-4 gap-3 m-auto ">
                        {courses.map((course) => (
                          <div
                            className={
                              "w-[250px]  border shadow-lg overflow-hidden "
                            }
                            key={course._id}
                          >
                            <div className=" overflow-hidden border rounded-md m-1 ">
                              <img
                                src={course.image.image_url}
                                alt={course.title}
                                width={150}
                                height={150}
                                className={
                                  "h-[150px] w-full object-fill transition-all hover:scale-105 aspect-square"
                                }
                              />
                            </div>
                            <div className=" text-sm m-2 grid space-y-2 ">
                              <div className="flex flex-wrap ">
                                <h6 className="font-medium overflow-hidden break-words">
                                  {course.title}
                                </h6>
                              </div>
                              <p className="font-medium text-xs text-muted-foreground">
                                Created : {course.instructorId.name} <br />
                                Price: {course.price}
                              </p>
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/user/courseDetailes/${course._id}`
                                    )
                                  }
                                  className="bg-teal-500 py-2 rounded w-full font-semibold text-white cursor-pointer hover:bg-teal-300"
                                >
                                  View Detailes
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    course.students.some(
                                      (student) => student._id == userId
                                    ) ||
                                    plans.some(
                                      (sub) =>
                                        sub.subscriptionId.instructorId._id ==
                                        course.instructorId._id
                                    )
                                      ? navigate(
                                          `/user/playCourse/${course._id}`
                                        )
                                      : cart?.courses.some(
                                          (cour) => cour._id == course._id
                                        )
                                      ? navigate("/user/cart")
                                      : handleCart(course._id)
                                  }
                                  className="bg-teal-500 py-2 rounded cursor-pointer font-semibold text-sm w-full text-white hover:bg-teal-300"
                                >
                                  {course.students.some(
                                    (student) => student._id == userId
                                  ) ||
                                  plans.some(
                                    (sub) =>
                                      sub.subscriptionId.instructorId._id ==
                                      course.instructorId._id
                                  )
                                    ? "Go To Class"
                                    : cart?.courses.some(
                                        (cour) => cour._id == course._id
                                      )
                                    ? "Go To Cart"
                                    : "Add To Cart"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Reviews">
              <div className="mx-3">
                <div>
                  <ScrollArea className="w-full h-[350px]  rounded-md border">
                    <div className="m-3">
                      <h6 className="font-bold my-2">Reviews</h6>

                      <div className="grid gap-2 grid-cols-2 ">
                        {reviews.length > 0 ? (
                          reviews.slice(0, 4).map((reviw) => (
                            <div className=" border" key={reviw._id}>
                              <div className="m-3">
                                <div className="flex  justify-between items-center">
                                  <div className="flex gap-3">
                                    <Avatar>
                                      <AvatarImage
                                        src={reviw?.userId.avatar.avatar_url}
                                        alt="instrutcor profile"
                                      />
                                      <AvatarFallback>
                                        <i className="bi bi-person-circle text-2xl"></i>
                                      </AvatarFallback>
                                    </Avatar>
                                    <p className="text-black font-medium">
                                      {reviw.userId.name}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Dialog
                                      open={editAlertOpen}
                                      onOpenChange={() => {
                                        if (editAlertOpen) {
                                          setValue("rating", "");
                                          setValue("star", 1);
                                        }
                                        setEditAlertOpen(!editAlertOpen);
                                      }}
                                    >
                                      <DialogTrigger asChild>
                                        {reviw.userId._id == userId && (
                                          <i
                                            onClick={() => {
                                              setEditAlertOpen(true);
                                              setValue("rating", reviw.review);
                                              setValue("star", reviw.stars);
                                            }}
                                            className="bi bi-pencil-square cursor-pointer"
                                          ></i>
                                        )}
                                      </DialogTrigger>

                                      <DialogContent className="sm:max-w-[425px]">
                                        <AlertDialogHeader>
                                          <DialogTitle>Edit Rating</DialogTitle>
                                          <DialogDescription>
                                            edit your rating
                                          </DialogDescription>
                                        </AlertDialogHeader>
                                        <div className="text-center">
                                          {[...Array(5)].map((_, index) => {
                                            const star = watch("star");
                                            return (
                                              <i
                                                {...register("star")}
                                                key={index}
                                                onMouseEnter={() =>
                                                  setValue("star", index + 1)
                                                }
                                                className={`bi ${
                                                  index + 1 <= star
                                                    ? "bi-star-fill"
                                                    : "bi-star"
                                                }`}
                                              ></i>
                                            );
                                          })}
                                          {errors.star && (
                                            <p className="text-red-500 text-sm">
                                              {errors.star.message}
                                            </p>
                                          )}
                                        </div>
                                        <textarea
                                          className="border border-teal-500 rounded h-30 p-2"
                                          {...register("rating")}
                                          placeholder="Type your mesage"
                                        />
                                        {errors.rating && (
                                          <p className="text-red-500 text-sm">
                                            {errors.rating.message}
                                          </p>
                                        )}
                                        <div className="text-center">
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <button
                                                disabled={loading}
                                                type="button"
                                                className="bg-teal-500 hover:bg-teal-300 rounded px-2 py-1 text-white font-semibold cursor-pointer"
                                              >
                                                {loading ? (
                                                  <>
                                                    Loading...
                                                    <span className="animate-spin inline-block text-lg">
                                                      <i className="bi bi-arrow-repeat"></i>
                                                    </span>
                                                  </>
                                                ) : (
                                                  <>Save</>
                                                )}
                                              </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                  Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  This action cannot be undone.
                                                  This will permanently save
                                                  your data from our servers.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-teal-500 hover:bg-teal-300 text-white hover:text-white cursor-pointer">
                                                  Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                  onClick={() =>
                                                    handleSubmit((data) =>
                                                      editRating(
                                                        data,
                                                        reviw._id
                                                      )
                                                    )()
                                                  }
                                                  className="bg-teal-500 hover:bg-teal-300 text-white hover:text-white cursor-pointer "
                                                >
                                                  Continue
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        {reviw.userId._id == userId && (
                                          <i className="bi bi-trash-fill cursor-pointer"></i>
                                        )}
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you absolutely sure?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete this review
                                            and remove data from our servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogAction
                                            className="bg-teal-500 hover:bg-teal-500"
                                            type="button"
                                          >
                                            Cancel
                                          </AlertDialogAction>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteRating(reviw._id)
                                            }
                                            type="button"
                                            className="bg-teal-500 hover:bg-teal-500"
                                          >
                                            Continue
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                                <div className="text-sm my-2">
                                  <div>
                                    {reviw.stars}
                                    <i className="bi bi-star-fill text-yellow-600"></i>{" "}
                                    {labels[`${reviw.stars}`]}
                                  </div>
                                  {reviw.review}
                                </div>
                                <p className="text-black font-medium text-xs">
                                  {" "}
                                  {moment(reviw.updatedAt).calendar()}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className=" border">
                            <div className="m-3">no reviwes</div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-indigo-500 underline font-semibold ">
                          <Dialog
                            open={seeMoreAlertOpen}
                            onOpenChange={setSeeMoreAlertOpen}
                          >
                            <DialogTrigger className="text-indigo-600 underline cursor-pointer font-semibold">
                              {reviews.length > 0 && " See more..."}
                            </DialogTrigger>

                            <DialogTitle>
                              <DialogDescription></DialogDescription>
                              <DialogContent className="sm:max-w-[900px]">
                                <div>
                                  <h6 className="my-3">Reviews & Ratings</h6>
                                  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                    <div className="grid gap-2 grid-cols-2">
                                      {reviews.map((rating) => (
                                        <div
                                          key={rating._id}
                                          className="border"
                                        >
                                          <div className="m-3">
                                            <div className="flex justify-between">
                                              <div className="flex  gap-3 items-center">
                                                <Avatar>
                                                  <AvatarImage
                                                    src={
                                                      rating.userId.avatar
                                                        .avatar_url
                                                    }
                                                    alt="instrutcor profile"
                                                  />
                                                  <AvatarFallback>
                                                    {" "}
                                                    <i className="bi bi-person-circle text-2xl"></i>
                                                  </AvatarFallback>
                                                </Avatar>
                                                <p className="text-black font-medium">
                                                  {rating.userId.name}
                                                </p>
                                              </div>
                                              <div className="flex gap-2">
                                                <Dialog
                                                  open={seeMoreEditAlertOpen}
                                                  onOpenChange={() => {
                                                    setSeeMoreEditAlertOpen(
                                                      !seeMoreEditAlertOpen
                                                    );
                                                    if (seeMoreEditAlertOpen) {
                                                      setValue("rating", "");
                                                      setValue("star", 1);
                                                    }
                                                    setValue(
                                                      "rating",
                                                      rating.review
                                                    );
                                                    setValue(
                                                      "star",
                                                      rating.stars
                                                    );
                                                  }}
                                                >
                                                  <form>
                                                    <DialogTrigger asChild>
                                                      {rating.userId._id ==
                                                        userId && (
                                                        <i className="bi bi-pencil-square"></i>
                                                      )}
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                      <DialogHeader>
                                                        <DialogTitle>
                                                          Edit Your Rating
                                                        </DialogTitle>
                                                        <DialogDescription></DialogDescription>
                                                      </DialogHeader>
                                                      <div className="text-center">
                                                        {[...Array(5)].map(
                                                          (_, index) => {
                                                            const star =
                                                              watch("star");
                                                            return (
                                                              <i
                                                                {...register(
                                                                  "star"
                                                                )}
                                                                key={index}
                                                                onMouseEnter={() =>
                                                                  setValue(
                                                                    "star",
                                                                    index + 1
                                                                  )
                                                                }
                                                                className={`bi ${
                                                                  index + 1 <=
                                                                  star
                                                                    ? "bi-star-fill"
                                                                    : "bi-star"
                                                                }`}
                                                              ></i>
                                                            );
                                                          }
                                                        )}
                                                        {errors.star && (
                                                          <p className="text-red-500 text-sm">
                                                            {
                                                              errors.star
                                                                .message
                                                            }
                                                          </p>
                                                        )}
                                                      </div>
                                                      <div className="grid gap-4">
                                                        <label htmlFor="rating">
                                                          Enter your message
                                                        </label>
                                                        <textarea
                                                          className="border border-teal-400 rounded py-2"
                                                          {...register(
                                                            "rating"
                                                          )}
                                                          id="rating"
                                                          name="rating"
                                                          placeholder="Enter your review here"
                                                        />
                                                        {errors.rating && (
                                                          <p className="text-red-500 text-sm">
                                                            {
                                                              errors.rating
                                                                .message
                                                            }
                                                          </p>
                                                        )}
                                                      </div>

                                                      <DialogFooter>
                                                        <DialogClose
                                                          onClick={() =>
                                                            setSeeMoreEditAlertOpen(
                                                              !seeMoreEditAlertOpen
                                                            )
                                                          }
                                                          className="bg-teal-500 rounded text-white px-2 py-2 font-semibold hover:bg-teal-300"
                                                        >
                                                          Cancel
                                                        </DialogClose>
                                                        <AlertDialog>
                                                          <AlertDialogTrigger
                                                            className={`rounded text-white px-2 py-2 font-semibold ${
                                                              loading
                                                                ? "bg-teal-300"
                                                                : "bg-teal-500 hover:bg-teal-300 cursor-pointer"
                                                            }`}
                                                            disabled={
                                                              errors.rating ||
                                                              errors.star ||
                                                              loading
                                                                ? true
                                                                : false
                                                            }
                                                          >
                                                            {loading ? (
                                                              <>
                                                                Loading...
                                                                <span className="animate-spin inline-block">
                                                                  <i className="bi bi-arrow-repeat"></i>
                                                                </span>
                                                              </>
                                                            ) : (
                                                              <>Save changes</>
                                                            )}
                                                          </AlertDialogTrigger>
                                                          <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                              <AlertDialogTitle>
                                                                Are you
                                                                absolutely sure?
                                                              </AlertDialogTitle>
                                                              <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone. This
                                                                will permanently
                                                                save your data
                                                                from our
                                                                servers.
                                                              </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                              <AlertDialogCancel className="bg-teal-500 rounded text-white px-2 py-2 font-semibold hover:bg-teal-300 hover:text-white">
                                                                Cancel
                                                              </AlertDialogCancel>
                                                              <AlertDialogAction
                                                                className="bg-teal-500 rounded text-white px-2 py-2 font-semibold hover:bg-teal-300"
                                                                onClick={() =>
                                                                  handleSubmit(
                                                                    (data) =>
                                                                      editRating(
                                                                        data,
                                                                        rating._id
                                                                      )
                                                                  )()
                                                                }
                                                              >
                                                                Continue
                                                              </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                          </AlertDialogContent>
                                                        </AlertDialog>
                                                      </DialogFooter>
                                                    </DialogContent>
                                                  </form>
                                                </Dialog>

                                                <AlertDialog>
                                                  <AlertDialogTrigger asChild>
                                                    {rating.userId._id ==
                                                      userId && (
                                                      <i
                                                        className={`bi bi-trash-fill cursor-pointer`}
                                                      ></i>
                                                    )}
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                      <AlertDialogTitle>
                                                        Are you absolutely sure?
                                                      </AlertDialogTitle>
                                                      <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        review from our servers.
                                                      </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                      <AlertDialogCancel className="bg-teal-500 rounded text-white px-2 py-2 font-semibold hover:bg-teal-300 hover:text-white">
                                                        Cancel
                                                      </AlertDialogCancel>
                                                      <AlertDialogAction
                                                        className="bg-teal-500 rounded text-white px-2 py-2 font-semibold hover:bg-teal-300"
                                                        onClick={() =>
                                                          handleDeleteRating(
                                                            rating._id
                                                          )
                                                        }
                                                      >
                                                        Continue
                                                      </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                  </AlertDialogContent>
                                                </AlertDialog>
                                              </div>
                                            </div>

                                            <div className="text-sm my-2">
                                              {rating.review}
                                            </div>
                                            <p className="text-black font-medium text-xs">
                                              {" "}
                                              {moment(
                                                rating.createdAt
                                              ).calendar()}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </DialogContent>
                            </DialogTitle>
                          </Dialog>
                        </span>
                        <span className="text-indigo-500 underline font-semibold ">
                          <Dialog
                            open={addOpenAlert}
                            onOpenChange={() => {
                              if (addOpenAlert) {
                                setValue("rating", "");
                                setValue("star", 1);
                              }
                              setAddOpenAlert(!addOpenAlert);
                            }}
                          >
                            {reviews.find((rev) => rev.userId._id == userId) ? (
                              ""
                            ) : (
                              <>
                                {courses.find((course) =>
                                  course.students.some(
                                    (stu) => stu._id == userId
                                  )
                                ) ? (
                                  <DialogTrigger
                                    className="cursor-pointer underline"
                                    onClick={() => setAddOpenAlert(true)}
                                  >
                                    Add Review
                                  </DialogTrigger>
                                ) : (
                                  ""
                                )}
                              </>
                            )}

                            <DialogContent className="sm:max-w-[425px]">
                              <AlertDialogHeader>
                                <DialogTitle>Add Rating</DialogTitle>
                                <DialogDescription>
                                  {" "}
                                  How whould you like to reate this instructor?
                                </DialogDescription>
                              </AlertDialogHeader>
                              <div className="text-center">
                                {[...Array(5)].map((_, index) => {
                                  const star = watch("star");
                                  return (
                                    <i
                                      {...register("star")}
                                      key={index}
                                      onMouseEnter={() =>
                                        setValue("star", index + 1)
                                      }
                                      className={`bi ${
                                        index + 1 <= star
                                          ? "bi-star-fill"
                                          : "bi-star"
                                      }`}
                                    ></i>
                                  );
                                })}
                              </div>
                              <textarea
                                className="border border-teal-500 rounded h-30 p-2"
                                {...register("rating")}
                                placeholder="Type your mesage"
                              />
                              {errors.rating && (
                                <p className="text-red-500 text-sm">
                                  {errors.rating.message}
                                </p>
                              )}
                              <div className="text-center">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      disabled={loading}
                                      type="button"
                                      className="bg-teal-500 hover:bg-teal-300 rounded px-2 py-1 text-white font-semibold cursor-pointer"
                                    >
                                      {loading ? (
                                        <>
                                          Loading...
                                          <span className="animate-spin inline-block text-lg">
                                            <i className="bi bi-arrow-repeat"></i>
                                          </span>
                                        </>
                                      ) : (
                                        <>Add</>
                                      )}
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently save to our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-teal-500 hover:bg-teal-300 text-white hover:text-white cursor-pointer">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-teal-500 hover:bg-teal-300 cursor-pointer"
                                        onClick={() =>
                                          handleSubmit(handleAddReport)()
                                        }
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </span>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Subscriptions">
              <div className="mx-3">
                <div>
                  <ScrollArea>
                    <div className="relative flex">
                      <div className="flex  mx-5 my-4 gap-3 m-auto ">
                        {subscriptions.map((value, index) => (
                          <div
                            key={index}
                            className="border w-full h-[273px] rounded border-teal-500"
                          >
                            <strong>Personal Plan</strong>
                            <div>
                              <div className="flex flex-col items-center justify-center h-[210px]">
                                <div>
                                  {value.plan == "Monthly"
                                    ? `Rs : ${value.price}/- per Month`
                                    : `Rs : ${value.price}/- per Year`}
                                </div>
                                <div className="text-xs">
                                  {value.plan == "Monthly"
                                    ? `Billed monthly.`
                                    : `Billed annually.`}
                                </div>
                                <div className="space-y-3 m-3">
                                  {value.description.map((val, index) => (
                                    <li className="text-xs" key={index}>
                                      {val}
                                    </li>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-end">
                                {plans.length > 0 ? (
                                  (() => {
                                    let customerId: string;
                                    const isSubscribed = subscriptions.some(
                                      (sub) =>
                                        plans.some((plan) => {
                                          if (
                                            sub._id === plan.subscriptionId._id
                                          ) {
                                            customerId = plan.customerId;
                                            return true;
                                          }
                                        })
                                    );
                                    return isSubscribed ? (
                                      <button
                                        type="button"
                                        onClick={() => goToDetailes(customerId)}
                                        className="w-full bg-teal-500  hover:bg-teal-300 text-white  font-semibold py-2 rounded cursor-pointer"
                                      >
                                        View detailes
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => subscribe(value._id)}
                                        type="button"
                                        className="w-full bg-teal-500  font-bold py-2 rounded cursor-pointer hover:bg-teal-500 text-white"
                                      >
                                        Start Subscription
                                      </button>
                                    );
                                  })()
                                ) : (
                                  <>
                                    <button
                                      onClick={() => subscribe(value._id)}
                                      type="button"
                                      className="w-full bg-teal-500 py-2 rounded cursor-pointer hover:bg-teal-500 text-white"
                                    >
                                      Start Subscription
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          // <div
                          //   key={index}
                          //   className="border w-full h-[300px] rounded border-teal-500"
                          // >
                          //   <h4 className=" underline text-center">
                          //     Personal Plan
                          //   </h4>
                          //   <div className="  m-1">
                          //     <div className="flex flex-col items-center justify-center h-[210px]">
                          //       <div>
                          //         {value.plan == "Monthly"
                          //           ? `Rs : ${value.price}/- per Month`
                          //           : `Rs : ${value.price}/- per Year`}
                          //       </div>
                          //       <div className="text-xs">
                          //         {value.plan == "Monthly"
                          //           ? `Billed monthly.`
                          //           : `Billed annually.`}
                          //       </div>
                          //       <div className="space-y-3 m-3">
                          //         {value.description.map((val, index) => (
                          //           <li className="text-xs" key={index}>
                          //             {val}
                          //           </li>
                          //         ))}
                          //       </div>
                          //     </div>

                          // {plans.length > 0 ? (
                          //   (() => {
                          //     let customerId: string;
                          //     const isSubscribed = subscriptions.some(
                          //       (sub) =>
                          //         plans.some((plan) => {
                          //           if (
                          //             sub._id === plan.subscriptionId._id
                          //           ) {
                          //             customerId = plan.customerId;
                          //             return true;
                          //           }
                          //         })
                          //     );
                          //     return isSubscribed ? (
                          //       <button
                          //         type="button"
                          //         onClick={() => goToDetailes(customerId)}
                          //         className="w-full bg-teal-500 hover:bg-teal-300 text-white font-semibold cursor-pointer py-2 rounded"
                          //       >
                          //         View detailes
                          //       </button>
                          //     ) : (
                          //       <button
                          //         onClick={() => subscribe(value._id)}
                          //         type="button"
                          //         className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                          //       >
                          //         Start Subscription
                          //       </button>
                          //     );
                          //   })()
                          // ) : (
                          //   <>
                          //     <button
                          //       onClick={() => subscribe(value._id)}
                          //       type="button"
                          //       className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                          //     >
                          //       Start Subscription
                          //     </button>
                          //   </>
                          // )}
                          //   </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(InstructorProfile);
