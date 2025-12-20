import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import moment from "moment";
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
import { useEffect, useRef, useState } from "react";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import type { ICourse } from "@/@types/courseType";
import type { IRating } from "@/@types/ratingType";
import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { ICart } from "@/@types/cartType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IUserProfile } from "@/@types/userProfile";
import type { ISubcription } from "@/@types/subscriptionType";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  ratingScheema,
  type RatingFormInputs,
} from "@/util/schemas/ratingScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);


const CourseDetailes = () => {
  const [course, setCourse] = useState<ICourse>();
  const [instructor, setInstructor] = useState<IUserProfile>();
  const [star, setStar] = useState<number>(0);
  const [editAlert, setEditAlert] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const { doRequest, err } = useRequest();
  const { _id } = useParams();
  const userId = useSelector((state: IUser) => state._id);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const [cart, setCart] = useState<ICart>();
  const navigate = useNavigate();
  const ratingRef = useRef<HTMLTextAreaElement>(null);
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
      url: `${userRoutes.courseDeatiles}/${_id}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setCourse(data.course);
        doRequest({
          url: `${userRoutes.subscriptions}/${data.course.instructorId._id}`,
          method: "get",
          body: {},
          onSuccess: (subscriptions) => {
            setSubscriptions(subscriptions.subscriptions);
          },
        });
        doRequest({
          url: `${userRoutes.profile}?userId=${data.course.instructorId._id}`,
          method: "get",
          body: {},
          onSuccess: (data) => {
            setInstructor(data.userData);
          },
        });
      },
    });

    doRequest({
      url: `${userRoutes.ratingCourse}/${_id}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setRatings(data.rating);
      },
    });
    doRequest({
      url: `${userRoutes.subscribe}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setPlans(data.plans);
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
  }, [_id]);

  const handleRating = (data: RatingFormInputs) => {
    setLoading(true);
    doRequest({
      url: userRoutes.ratingCourse,
      method: "post",
      body: { review: data.rating, stars: data.star, courseId: _id, userId },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${_id}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setLoading(false);
            setAddAlert(false);
            setValue("star", 1);
            setValue("rating", "");
            toast.success("Successfully added your review ");
            setRatings(response.rating);
          },
        });
      },
    });
  };

  const handleEditRatings = (ratingId: string) => {
    doRequest({
      url: `${userRoutes.ratingCourse}/${ratingId}`,
      method: "patch",
      body: { review: ratingRef.current!.value, stars: star },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${_id}`,
          method: "get",
          body: {},
          onSuccess: (data) => {
            toast.success("Review updated successfully...");
            setRatings(data.rating);
            setEditAlert(!editAlert);
          },
        });
      },
    });
  };
  const handleCart = (courseId: string) => {
    doRequest({
      url: `${userRoutes.addToCart}?courseId=${courseId}`,
      method: "post",
      body: { userId },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.Cart}/${userId}`,
          method: "get",
          body: {},
          onSuccess: (data) => {
            setCart(data.cart);
            toast.success("Item Added to cart");
          },
        });
      },
    });
  };

  const subscribe = async (subscriptionId: string) => {
    doRequest({
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

  const handleDeleteRating = (ratingId: string) => {
    doRequest({
      url: `${userRoutes.ratingCourse}/${ratingId}`,
      method: "delete",
      body: {},
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${_id}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setRatings(response.rating);
            toast.success("Review deleted successfully..");
          },
        });
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <>
      <Header />
     
      <div className=" text-black flex bg-center bg-no-repeat bg-cover items-center justify-center h-[300px]">
        <div className="flex align-middle gap-5 items-center justify-center ">
          <img
            className="md:h-70 md:w-96 h-60 w-90  object-fill"
            src={course?.image?.image_url}
          />
        </div>
        <div className="mx-5">
          <Separator
            orientation="vertical"
            className="md:min-h-[50vh] min-h-[30vh] bg-teal-500 "
          />
        </div>
        <div className="grid mx-2 text-black ">
          <strong className="font-bold md:text-3xl text-xl">{course?.title}</strong>
          <strong className="font-bold md:text-1xl text-lg">{course?.thumbnail}</strong>
          <p className="md:font-bold font-semibold">created by {course?.instructorId?.name}</p>
          <span className="text-xs">
            Last Updated {moment(course?.createdAt).calendar()}
          </span>{" "}
          <span className="text-xs">language english</span>
        </div>
      </div>

      <div className="flex justify-center gap-10  my-2">
        <div className="grid items-center justify-center text-center px-2 text-xs">
          <p>4.7</p>
          <div className="animate-bounce">
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
          </div>
          <p>ratings</p>
        </div>
        <div>
          <Separator orientation="vertical" className="bg-teal-600" />
        </div>
        <div className="">
          <div className="text-center text-xs">
            <i className="bi bi-person-vcard-fill"></i>
            <p>{course?.students?.length}</p>
            <p>students</p>
          </div>
        </div>
      </div>

        <Card className="md:hidden block w-full max-w-sm mx-auto border-0 border-none">
          <CardContent className="border-0">
            <img
              className="h-70 w-96  object-fill"
              src={course?.image?.image_url}
            />
            <p>
              <span className="font-bold">{course?.price}/- </span>
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2 border-0">
            <Button
              onClick={() =>
                course?.students.some((student) => student._id == userId) ||
                plans.some(
                  (sub) =>
                    sub.subscriptionId.instructorId._id ==
                    course?.instructorId._id
                )
                  ? navigate(`/user/playCourse/${course?._id}`)
                  : cart?.courses.some((cour) => cour._id == course?._id)
                  ? navigate("/user/cart")
                  : handleCart(course?._id!)
              }
              className="bg-teal-500 w-full rounded text-white text-xs cursor-pointer font-semibold transition-all hover:scale-105 hover:bg-teal-300"
            >
              {course?.students.some((student) => student._id == userId) ||
              plans.some(
                (sub) =>
                  sub.subscriptionId.instructorId._id ==
                  course?.instructorId._id
              )
                ? "Go To Class"
                : cart?.courses.some((cour) => cour._id == course?._id)
                ? `Go To Cart`
                : "Add To Cart"}
            </Button>
            {plans.some(
              (sub) =>
                sub.subscriptionId.instructorId._id == course?.instructorId._id
            ) ? (
              <></>
            ) : (
              <>
                {subscriptions.length > 0 && (
                  <>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or
                      </span>
                    </div>
                    <article className="space-y-5">
                      <h2 className="font-bold">Boost your conversion rate</h2>
                      <p className="line-clamp-3 text-xs font-extralight">
                        Get this course, plus all the courses of this
                        instructor, with This Plan.
                      </p>

                      <Sheet key={"bottom"}>
                        <SheetTrigger asChild>
                          <Button
                            className="bg-teal-500 w-full
                           transition-all hover:scale-105
                  rounded text-white text-xs font-semibold cursor-pointer hover:bg-teal-300 hover:text-white"
                          >
                            Subscribe
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle> Instructor Subscriptions</SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          <div className="grid grid-cols-5 mx-2">
                            {subscriptions.map((value) => (
                              <div
                                key={value._id}
                                className={
                                  "relative bg-teal-500 shadow-2xl rounded-3xl p-8 border-1 border-gray-900/10 sm:p-10 "
                                }
                              >
                                <h3
                                  id={value._id}
                                  className={
                                    "text-base/7 font-semibold text-white"
                                  }
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
                                  <span className={"text-white text-base"}>
                                    /
                                    {value.plan == "Monthly"
                                      ? `monthly`
                                      : `yearly`}
                                  </span>
                                </p>

                                <ul
                                  role="list"
                                  className={
                                    "mt-8 space-y-3 text-sm/6 sm:mt-10 text-white"
                                  }
                                >
                                  {value.description.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                      <CheckIcon
                                        aria-hidden="true"
                                        className={
                                          "h-6 w-5 flex-none text-teal-400"
                                        }
                                      />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                                <a
                                  onClick={() => subscribe(value._id)}
                                  className={
                                    "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-teal-500 text-white shadow-xs hover:bg-teal-400 focus-visible:outline-teal-500"
                                  }
                                >
                                  Start Subscription
                                </a>
                              </div>
                            ))}
                          </div>
                        </SheetContent>
                      </Sheet>
                      <p className="text- text-xs font-extralight text-center">
                        Cancel anytime
                      </p>
                    </article>
                  </>
                )}
              </>
            )}
          </CardFooter>
        </Card>

      <div className="container mx-auto flex md:flex-row flex-col gap-5">
         
        <div className="md:basis-2/3 basis-1 p-4">
          <Tabs defaultValue="Course Content">
            <TabsList className="bg-teal-400 ">
              <TabsTrigger value="Course Content">Course Content</TabsTrigger>
              <TabsTrigger value="Detailes">Detailes</TabsTrigger>
              <TabsTrigger value="Review & Ratings">
                Review & Ratings
              </TabsTrigger>
              <TabsTrigger value="Instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="Course Content">
              <span className="font-bold text-2xl">Course Contents</span>
              <div className="border border-gray-300 my-5">
                <Accordion type="single" collapsible>
                  {course?.sections?.sections.map((section, index) => (
                    <AccordionItem
                      key={section?.sectionTitle + index}
                      value="item-1"
                    >
                      <AccordionTrigger className=" px-2 cursor-pointer">
                        <div className="flex justify-between w-full">
                          <span>Section {index + 1} </span>
                          <span>{section?.sectionTitle} </span>
                        </div>
                      </AccordionTrigger>
                      {section?.lectures.map((lecture, idx) => (
                        <AccordionContent
                          key={lecture.title + index + idx}
                          className="flex justify-between px-2"
                        >
                          <p>{lecture?.title}</p>
                          <p>{lecture?.duration}</p>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            <TabsContent
              className="whitespace-normal indent-8 line-clamp-8"
              value="Detailes"
            >
              {course?.thumbnail} {course?.description}
            </TabsContent>
            <TabsContent value="Review & Ratings">
              <div className="grid grid-cols-2 gap-5 p-4">
                {ratings?.length > 0 ? (
                  <>
                    {ratings?.map((rating) => (
                      <div key={rating?._id} className="border-2 space-y-2 p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={rating?.userId?.avatar?.avatar_url}
                                alt="userImage"
                              />
                              <AvatarFallback>
                                {" "}
                                <i className="bi bi-person-circle"></i>
                              </AvatarFallback>
                            </Avatar>
                            <strong className="text-xs font-extralight ">
                              {rating?.userId?.name}
                            </strong>
                          </div>
                          {rating?.userId?._id == userId && (
                            <div className="flex gap-5">
                              <Dialog
                                open={editAlert}
                                onOpenChange={() => {
                                  if (editAlert) {
                                  }
                                  setEditAlert(!editAlert);
                                }}
                              >
                                <form>
                                  <DialogTrigger
                                    onClick={() => setStar(rating?.stars)}
                                    asChild
                                  >
                                    <i className="bi bi-pencil-square cursor-pointer"></i>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px] ">
                                    <DialogHeader>
                                      <DialogTitle className="text-sm">
                                        Edit Rating
                                      </DialogTitle>
                                      <DialogDescription> </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((_, index) => {
                                        return (
                                          <i
                                            key={index}
                                            onMouseEnter={() =>
                                              setStar(index + 1)
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
                                      id="ratingEdit"
                                      name="ratingEdit"
                                      ref={ratingRef}
                                      className="h-20  not-focus:outline-0 not-focus:border-0 hover:outline-0 hover:border-0"
                                      placeholder="Edit Review..."
                                      defaultValue={rating?.review}
                                    />

                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <button className="bg-teal-500 hover:bg-teal-300 cursor-pointer  bottom-10  px-1 py-2 mb-2 mr-2 text-white text-xs rounded">
                                              Save changes
                                            </button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Are you absolutely sure?
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently Save your
                                                Rating to our servers.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                                                Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                onClick={() =>
                                                  handleEditRatings(rating._id)
                                                }
                                                className="bg-teal-500 hover:bg-teal-300"
                                              >
                                                Continue
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </form>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <i className="bi bi-trash-fill cursor-pointer"></i>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete your Rating from our
                                      servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteRating(rating._id)
                                      }
                                      className="bg-teal-500 hover:bg-teal-300"
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center ">
                          <i className="bi bi-star-fill text-xs"></i>
                          <strong className="text-xs font-extralight ">
                            {rating.stars}
                          </strong>
                        </div>
                        <div className="text-xs font-extralight">
                          {rating.review}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>No ratings available for this course.</>
                )}
              </div>

              <Sheet>
                {ratings.length > 4 && (
                  <SheetTrigger className="text-end w-full">
                    <p className="text-xs font-extralight text-blue-600 cursor-pointer">
                      View more...
                    </p>
                  </SheetTrigger>
                )}

                <SheetContent side="top" className="w-full h-screen">
                  <SheetHeader>
                    <SheetTitle className="text-lg font-extrabold">
                      Rating and reviews of react course
                    </SheetTitle>
                    <SheetDescription asChild>
                      <ScrollArea className=" rounded-md border h-screen">
                        <div className="grid grid-cols-3 gap-5 p-4">
                          {ratings.map((value) => (
                            <div
                              key={value._id}
                              className="border-2 space-y-2 p-4"
                            >
                              <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={value.userId.avatar.avatar_url}
                                      alt="userImage"
                                    />
                                    <AvatarFallback>
                                      {" "}
                                      <i className="bi bi-person-circle"></i>
                                    </AvatarFallback>
                                  </Avatar>

                                  <strong className="text-xs font-extralight ">
                                    {value.userId.avatar.avatar_url}
                                  </strong>
                                </div>
                                <div className="flex gap-5">
                                  <Dialog>
                                    <form>
                                      <DialogTrigger asChild>
                                        <i className="bi bi-pencil-square cursor-pointer"></i>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px] ">
                                        <DialogHeader>
                                          <DialogTitle className="text-sm">
                                            Edit Rating
                                          </DialogTitle>
                                          <DialogDescription>
                                            {" "}
                                          </DialogDescription>
                                        </DialogHeader>

                                        <textarea
                                          id="username-1"
                                          name="username "
                                          className="h-20  not-focus:outline-0 not-focus:border-0 hover:outline-0 hover:border-0"
                                          placeholder="Edit Review..."
                                        />

                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <button className="bg-teal-500 hover:bg-teal-300 cursor-pointer  bottom-10  px-1 py-2 mb-2 mr-2 text-white text-xs rounded">
                                              Save changes
                                            </button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    </form>
                                  </Dialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <i className="bi bi-trash-fill cursor-pointer"></i>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This
                                          will permanently delete your Rating
                                          from our servers.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="bg-teal-500 hover:bg-teal-300">
                                          Continue
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                              <div className="flex items-center ">
                                <i className="bi bi-star-fill text-xs"></i>
                                <strong className="text-xs font-extralight ">
                                  {value.stars}
                                </strong>
                              </div>
                              <div className="text-xs font-extralight">
                                {value.review}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Dialog
                open={addAlert}
                onOpenChange={() => {
                  setValue("rating", "");
                  setValue("star", 1);
                  setAddAlert(!addAlert);
                }}
              >
                <form>
                  <DialogTrigger className="text-indigo-600 cursor-pointer underline font-semibold">
                    {course?.students.some(
                      (student) => student._id == userId
                    ) ||
                    plans.some(
                      (sub) =>
                        sub.subscriptionId.instructorId._id ==
                        course?.instructorId._id
                    )
                      ? !ratings.find((rat) => rat.userId._id == userId)
                        ? "Rate this course"
                        : ""
                      : ""}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {" "}
                        How whould you Rate this course?
                      </DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="text-center">
                      <form className="w-full flex flex-col space-y-2">
                        <div>
                          {[...Array(5)].map((_, index) => {
                            const star = watch("star");
                            return (
                              <i
                                {...register("star")}
                                key={index}
                                onMouseEnter={() => setValue("star", index + 1)}
                                className={`bi ${
                                  index + 1 <= star ? "bi-star-fill" : "bi-star"
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
                        <label htmlFor="rating">Your Message</label>
                        <textarea
                          {...register("rating")}
                          className=" border rounded border-teal-400 h-50 p-2"
                          placeholder="Type your message here."
                          id="rating"
                        />
                        {errors.rating && (
                          <p className="text-red-500 text-sm">
                            {errors.rating.message}
                          </p>
                        )}
                      </form>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button
                          onClick={() => {
                            setValue("rating", "");
                            setValue("star", 1);
                          }}
                          className="bg-teal-500 hover:bg-teal-300 border px-2 py-1 text-white rounded cursor-pointer font-semibold"
                        >
                          Cancel
                        </button>
                      </DialogClose>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            disabled={loading}
                            className={`bg-teal-500 hover:bg-teal-300 border px-2 py-1 text-white rounded ${
                              loading ? "" : "cursor-pointer"
                            } font-semibold`}
                          >
                            {loading ? (
                              <>
                                Loading...
                                <span className="animate-spin inline-block text-lg">
                                  <i className="bi bi-arrow-repeat"></i>
                                </span>
                              </>
                            ) : (
                              "Save"
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
                              permanently save data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-teal-500 hover:bg-teal-300 text-white rounded cursor-pointer hover:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleSubmit(handleRating)();
                              }}
                              className="bg-teal-500 hover:bg-teal-300 text-white rounded cursor-pointer"
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
            </TabsContent>
            <TabsContent value="Instructor">
              <div className="bg-white">
                <div className="mx-auto grid max-w-7xl space-y-5 px-6 lg:px-8 ">
                  <div className="flex items-center gap-x-6">
                    <Avatar
                      onClick={() =>
                        navigate(`/user/instructorProfile/${instructor?._id}`)
                      }
                      className="h-20 w-20 cursor-pointer"
                    >
                      <AvatarImage
                        src={instructor?.avatar.avatar_url}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        <i className="bi bi-person-circle text-7xl rounded-full outline-1 -outline-offset-1 outline-black/5"></i>
                      </AvatarFallback>
                    </Avatar>

                    <div className="w-full">
                      <h3 className=" font-semibold tracking-tight text-gray-900">
                        name: {instructor?.name}
                      </h3>
                    </div>
                  </div>

                  <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                      Meet our Instructor
                    </h2>
                    <p className="mt-6 text-sm font-light text-gray-600 indent-8 line-clamp-8">
                      {instructor?.about}
                    </p>
                  
                    <div className="space-x-5 flex ">
                      <span className="font-light">students : 8</span>
                      <span className="font-light">courses : 8</span>
                        Ratings : 4.7{" "}
                      <div className="font-light animate-bounce">
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="md:block hidden w-full max-w-sm border-0 border-none">
          <CardContent className="border-0">
            <img
              className="h-70 w-96  object-fill"
              src={course?.image?.image_url}
            />
            <p>
              <span className="font-bold">{course?.price}/- </span>
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2 border-0">
            <Button
              onClick={() =>
                course?.students.some((student) => student._id == userId) ||
                plans.some(
                  (sub) =>
                    sub.subscriptionId.instructorId._id ==
                    course?.instructorId._id
                )
                  ? navigate(`/user/playCourse/${course?._id}`)
                  : cart?.courses.some((cour) => cour._id == course?._id)
                  ? navigate("/user/cart")
                  : handleCart(course?._id!)
              }
              className="bg-teal-500 w-full rounded text-white text-xs cursor-pointer font-semibold transition-all hover:scale-105 hover:bg-teal-300"
            >
              {course?.students.some((student) => student._id == userId) ||
              plans.some(
                (sub) =>
                  sub.subscriptionId.instructorId._id ==
                  course?.instructorId._id
              )
                ? "Go To Class"
                : cart?.courses.some((cour) => cour._id == course?._id)
                ? `Go To Cart`
                : "Add To Cart"}
            </Button>
            {plans.some(
              (sub) =>
                sub.subscriptionId.instructorId._id == course?.instructorId._id
            ) ? (
              <></>
            ) : (
              <>
                {subscriptions.length > 0 && (
                  <>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or
                      </span>
                    </div>
                    <article className="space-y-5">
                      <h2 className="font-bold">Boost your conversion rate</h2>
                      <p className="line-clamp-3 text-xs font-extralight">
                        Get this course, plus all the courses of this
                        instructor, with This Plan.
                      </p>

                      <Sheet key={"bottom"}>
                        <SheetTrigger asChild>
                          <Button
                            className="bg-teal-500 w-full
                            transition-all hover:scale-105
                  rounded text-white text-xs font-semibold cursor-pointer hover:bg-teal-300 hover:text-white"
                          >
                            Subscribe
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-screen">
                          <SheetHeader>
                            <SheetTitle> Instructor Subscriptions</SheetTitle>
                            <SheetDescription></SheetDescription>
                          </SheetHeader>
                          <div className="grid grid-cols-5 mx-2">
                            {subscriptions.map((value) => (
                              <div
                                key={value._id}
                                className={
                                  "relative bg-teal-500 shadow-2xl rounded-3xl p-8 border-1 border-gray-900/10 sm:p-10 "
                                }
                              >
                                <h3
                                  id={value._id}
                                  className={
                                    "text-base/7 font-semibold text-white"
                                  }
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
                                  <span className={"text-white text-base"}>
                                    /
                                    {value.plan == "Monthly"
                                      ? `monthly`
                                      : `yearly`}
                                  </span>
                                </p>

                                <ul
                                  role="list"
                                  className={
                                    "mt-8 space-y-3 text-sm/6 sm:mt-10 text-white"
                                  }
                                >
                                  {value.description.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                      <CheckIcon
                                        aria-hidden="true"
                                        className={
                                          "h-6 w-5 flex-none text-teal-400"
                                        }
                                      />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                                <a
                                  onClick={() => subscribe(value._id)}
                                  className={
                                    "mt-8 block rounded-md px-3.5 py-2.5 cursor-pointer text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 bg-teal-500 text-white shadow-xs hover:bg-teal-400 focus-visible:outline-teal-500"
                                  }
                                >
                                  Start Subscription
                                </a>
                              </div>
                            ))}
                          </div>
                        </SheetContent>
                      </Sheet>
                      <p className="text- text-xs font-extralight text-center">
                        Cancel anytime
                      </p>
                    </article>
                  </>
                )}
              </>
            )}
          </CardFooter>
        </Card>

      </div>
      <Footer />
    </>
  );
};

export default CourseDetailes;
