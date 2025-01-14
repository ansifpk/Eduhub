import {
  courseDetailes,
  deleteRating,
  editRating,
  getRatings,
  instructorSubscriptions,
  logout,
  purchaseSubscription,
  stripePurchase,
  userPlans,
} from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ICourse } from "@/@types/courseType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

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
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { IRating } from "@/@types/ratingType";
import moment from "moment";
import { DialogTitle, Rating } from "@mui/material";
import { Edit, StarIcon, Trash } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/authSlice";
import { IUserSubscribe } from "@/@types/userSubscribe";
import { ISubcription } from "@/@types/subscriptionType";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
const CourseDetailesPage = () => {
  const [course, setCourse] = useState<ICourse>();
  const [totellStudents, setStudents] = useState(0);
  const [option, setOption] = useState(true);
  const [totellCourses, setTotellCourses] = useState(0);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [paymentMethord, setPaymentMethord] = useState("Wallet");
  const { courseId } = useParams();
  const userId = useSelector((state: User) => state.id);
  const [val, setVal] = useState<number | null>(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    ratingError: false,
  });
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

  useEffect(() => {
    const call = async () => {
      const data = await courseDetailes(courseId!);
      if (data.success) {
        setCourse(data.course);
        const subscriptions = await instructorSubscriptions(
          data.course.instructorId._id
        );
        setSubscriptions(subscriptions.subscriptions);
      } else if (data.status == 403) {
        const response = await logout();
        if (response.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(data.response.data.message);
          return navigate("/users/login");
        }
      }
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
      } else {
        return toast.error(ratings.response.data.message);
      }

      const plans = await userPlans(userId);
      if (plans.success) {
        setPlans(plans.plans);
      } else {
        return toast.error(plans.response.data.message);
      }
    };
    call();
  }, [courseId]);
  console.log("plans", plans);

  const handleOrder = async () => {
    try {
      const data = await stripePurchase([course!], userId);
      if (data) {
        await stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      } else if (data.status == 403) {
        const response = await logout();
        if (response.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(data.response.data.message);
          return navigate("/users/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  let wr =
    "Hi everyone, I’m Ansif, a student on Udemy, and I’m excited to be here! This website has been incredibly helpful in my learning journey, and I’m looking forward to making the most of it. Can’t wait to dive into more knowledge and improve my skills!  and ibelieve also everyone feels this same Hi everyone, I’m Ansif, a student on Udemy, and I’m excited to be here! This website has been incredibly helpful in my learning journey, and I’m looking forward to making the most of it. Can’t wait dive into";

  console.log(subscriptions, "subscriptions");

  const handleEditRatings = async (ratingId: string) => {
    const response = await editRating(ratingId, review, stars);
    if (response.success) {
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
        setVal(1);
        setStars(0!);
        setReview("");
        return toast.success("Review edit successfully..");
      } else {
        return toast.error(ratings.response.data.message);
      }
    } else if (response.status == 403) {
      const resp = await logout();
      if (resp.succuss) {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        dispatch(removeUser());
        toast.error(response.response.data.message);
        return navigate("/users/login");
      }
    } else {
      return toast.error(response.response.data.message);
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    const response = await deleteRating(ratingId);
    if (response.success) {
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
        toast.success("Review deleted successfully..");
      } else if (response.status == 403) {
        const resp = await logout();
        if (resp.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(response.response.data.message);
          return navigate("/users/login");
        }
      } else {
        return toast.error(ratings.response.data.message);
      }
    } else if (response.status == 403) {
      const resp = await logout();
      if (resp.succuss) {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        dispatch(removeUser());
        toast.error(response.response.data.message);
        return navigate("/users/login");
      }
    } else {
      return toast.error(response.response.data.message);
    }
  };
  console.log("cour", course);

  const subscribe = async (subscriptionId: string) => {
    console.log(subscriptionId);
    const response = await purchaseSubscription(subscriptionId, userId);
    console.log(response);
    if (response.success) {
      await stripe?.redirectToCheckout({
        sessionId: response.sessionId,
      });
    } else {
      return toast.error(response.response.data.message);
    }
  };
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="flex bg-gray-900 w-full h-[250px] ">
        <img
          src={course?.image.image_url}
          className="h-[220px] w-[350px] object-fill m-3"
          alt=""
        />
        <div className="w-full m-3">
          <h3 className="text-white m-3">Title : {course?.title}</h3>
          <h3 className="text-white m-3">About : {course?.thumbnail}</h3>
          <div className="flex m-3 gap-3 space-y-1 items-center">
            <Avatar>
              <AvatarImage
                src={
                  course?.instructorId.avatar.avatart_url
                    ? course?.instructorId.avatar.avatart_url
                    : "https://github.com/shadcn.png"
                }
                alt="instrutcor profile"
              />
            </Avatar>
            <p className="text-white">{course?.instructorId.name}</p>
            <p className="text-white font-medium text-xs">
              Created : {moment(course?.createdAt).calendar()}
            </p>
          </div>
          <div className="flex text-white m-3 gap-3 font-medium text-xs">
            <div>total Videos : {course?.sections.length}</div>
            total Students : {course?.students?.length}
          </div>
        </div>
      </div>
      <div className="row mt-4 flex justify-center">
        <div className="col-8">
          <div className="bg-white">
            <div className="m-2">
              <h2 className="m-1">course content</h2>
              <Accordion
                type="single"
                collapsible
                className="w-full border  bg-gray-200"
              >
                {course?.sections.map((val, index) => (
                  <AccordionItem key={index} value={`${index}`}>
                    <AccordionTrigger className="text-base font-bold hover:no-underline mx-3">
                      Section {index + 1} - {val.sectionTitle}
                    </AccordionTrigger>
                    {val.lectures.map((lecture, ind) => (
                      <AccordionContent
                        key={ind}
                        className="flex   text-sm p-3 border-t bg-white  items-center justify-between"
                      >
                        <div className="">
                          Lecture {ind + 1} - {lecture.title}{" "}
                        </div>
                        <div>{lecture.duration}</div>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                ))}
              </Accordion>
              <div>
                <h5 className="my-4 ml-5">Discription</h5>
                <div className="ml-5">
                  {course?.thumbnail}
                  <br />
                  {course?.description}
                </div>
                <div className="m-3">
                  <h6>Reviews</h6>
                  <div className="grid gap-2 grid-cols-2 ">
                    {ratings.length > 0 ? (
                      ratings.slice(0, 4).map((value, index) => (
                        <div className="border" key={index}>
                          <div className="m-3">
                            <div className="flex items-center justify-between">
                              <div className="flex  gap-3 items-center">
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      value.userId.avatar.avatar_url
                                        ? value.userId.avatar.avatar_url
                                        : "https://github.com/shadcn.png"
                                    }
                                    alt="user profile"
                                  />
                                </Avatar>
                                <p className="text-black font-medium">
                                  {value.userId.name}
                                </p>
                              </div>
                              <div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    {value.userId._id == userId && (
                                      <Edit
                                        onClick={() => {
                                          setReview(value.review);
                                          setStars(value.stars);
                                          setVal(value.stars);
                                        }}
                                        className="h-3 m-1 cursor-pointer"
                                      />
                                    )}
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Edit your Review
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        <div className="grid w-full gap-1.5">
                                          <Rating
                                            className="mx-5"
                                            name="hover-feedback"
                                            value={val}
                                            precision={0.5}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                              setVal(newValue);
                                              setStars(newValue!);
                                            }}
                                            emptyIcon={
                                              <StarIcon
                                                style={{ opacity: 0.55 }}
                                                fontSize="inherit"
                                              />
                                            }
                                          />
                                          <Label
                                            className={
                                              errors.ratingError
                                                ? "text-danger"
                                                : ""
                                            }
                                            htmlFor="message-2"
                                          >
                                            Your Message
                                          </Label>
                                          <Textarea
                                            value={review}
                                            onChange={(e) => {
                                              if (e.target.value.length < 3) {
                                                setErrors((prev) => ({
                                                  ...prev,
                                                  ratingError: true,
                                                }));
                                              } else {
                                                setErrors((prev) => ({
                                                  ...prev,
                                                  ratingError: false,
                                                }));
                                              }
                                              setReview(e.target.value);
                                            }}
                                            placeholder="Type your message here."
                                            id="message-2"
                                          />
                                          {errors.ratingError ? (
                                            <p className="text-sm text-danger text-muted-foreground">
                                              Your message will be show to the
                                              public.
                                            </p>
                                          ) : (
                                            <p className="text-sm text-muted-foreground">
                                              Your message will be show to the
                                              public.
                                            </p>
                                          )}
                                        </div>
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
                                        disabled={errors.ratingError}
                                        onClick={() =>
                                          handleEditRatings(value._id)
                                        }
                                        type="button"
                                        className="bg-teal-500 hover:bg-teal-500"
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    {value.userId._id == userId && (
                                      <Trash className="h-3 m-1 cursor-pointer" />
                                    )}
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this review and
                                        remove data from our servers.
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
                                          handleDeleteRating(value._id)
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
                                {" "}
                                <Rating
                                  name="customized-10"
                                  defaultValue={1}
                                  max={1}
                                  size="small"
                                />{" "}
                                {value.stars} {labels[`${value.stars}`]}
                              </div>
                              {value.review}
                            </div>
                            <p className="text-black font-medium text-xs">
                              {" "}
                              {moment(value.updatedAt).calendar()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available for this course</p>
                    )}
                  </div>
                  <Dialog>
                    <DialogTrigger className="text-primary">
                      {ratings.length > 4 && "see more"}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px]">
                      <ScrollArea className="sm:max-w-[800px] h-[450px]">
                        <div className="grid gap-2 grid-cols-2 ">
                          {ratings.map((value, index) => (
                            <div className="border" key={index}>
                              <div className="m-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex  gap-3 items-center">
                                    <Avatar>
                                      <AvatarImage
                                        src={
                                          value.userId.avatar.avatar_url
                                            ? value.userId.avatar.avatar_url
                                            : "https://github.com/shadcn.png"
                                        }
                                        alt="user profile"
                                      />
                                    </Avatar>
                                    <p className="text-black font-medium">
                                      {value.userId.name}
                                    </p>
                                  </div>
                                  <div>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        {value.userId._id == userId && (
                                          <Edit
                                            onClick={() => {
                                              setReview(value.review);
                                              setStars(value.stars);
                                              setVal(value.stars);
                                            }}
                                            className="h-3 m-1 cursor-pointer"
                                          />
                                        )}
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Edit your Review
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            <div className="grid w-full gap-1.5">
                                              <Rating
                                                className="mx-5"
                                                name="hover-feedback"
                                                value={val}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                  setVal(newValue);
                                                  setStars(newValue!);
                                                }}
                                                emptyIcon={
                                                  <StarIcon
                                                    style={{
                                                      opacity: 0.55,
                                                    }}
                                                    fontSize="inherit"
                                                  />
                                                }
                                              />
                                              <Label
                                                className={
                                                  errors.ratingError
                                                    ? "text-danger"
                                                    : ""
                                                }
                                                htmlFor="message-2"
                                              >
                                                Your Message
                                              </Label>
                                              <Textarea
                                                value={review}
                                                onChange={(e) => {
                                                  if (
                                                    e.target.value.length < 3
                                                  ) {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      ratingError: true,
                                                    }));
                                                  } else {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      ratingError: false,
                                                    }));
                                                  }
                                                  setReview(e.target.value);
                                                }}
                                                placeholder="Type your message here."
                                                id="message-2"
                                              />
                                              {errors.ratingError ? (
                                                <p className="text-sm text-danger text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
                                                </p>
                                              ) : (
                                                <p className="text-sm text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
                                                </p>
                                              )}
                                            </div>
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
                                            disabled={errors.ratingError}
                                            onClick={() =>
                                              handleEditRatings(value._id)
                                            }
                                            type="button"
                                            className="bg-teal-500 hover:bg-teal-500"
                                          >
                                            Continue
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        {value.userId._id == userId && (
                                          <Trash className="h-3 m-1 cursor-pointer" />
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
                                              handleDeleteRating(value._id)
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
                                    {" "}
                                    <Rating
                                      name="customized-10"
                                      defaultValue={1}
                                      max={1}
                                      size="small"
                                    />{" "}
                                    {value.stars} {labels[`${value.stars}`]}
                                  </div>
                                  {value.review}
                                </div>
                                <p className="text-black font-medium text-xs">
                                  {" "}
                                  {moment(value.updatedAt).calendar()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <div>
                    <p className="font-medium text-lg">Instructor info</p>
                    <div
                      className="flex items-center bg-blue-200 rounded-3"
                      style={{
                        backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.5),
                  rgba(10, 10, 10, 0.5)
                    ), url(https://github.com/shadcn.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div
                        onClick={() =>
                          navigate(
                            `/user/instructorProfile/${course?.instructorId._id}`
                          )
                        }
                        className="w-48 h-48 m-2 rounded-full  overflow-hidden bg-gray-200"
                      >
                        <img
                          src={
                            course?.instructorId.avatar.avatart_url
                              ? course?.instructorId.avatar.avatart_url
                              : "https://github.com/shadcn.png"
                          }
                          alt="instructor image"
                        />
                      </div>

                      <Card className="m-2 w-[600px] bg-gray-50/50 backdrop-blur-sm">
                        <CardDescription className="m-4 space-y-2 overflow-hidden break-words">
                          <div className="font-bold text-black">
                            {course?.instructorId.name}
                          </div>
                          <div className="font-bold">{"im developer"}</div>
                          <div className="font-bold text-xs text-black">
                            {wr}
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium">
                              <Rating readOnly max={1} />
                            </p>
                            <p className="">
                              {/* {instructorRatings.length} instructor Ratings */}
                            </p>
                          </div>
                        </CardDescription>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <Card className="sticky top-0">
            <CardHeader>
              <h2 className="text-lg font-semibold">Purchase the course</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col  gap-3 mb-4 last:mb-0">
                <img
                  src={course?.image.image_url}
                  alt={"review.name"}
                  className="w-auto h-auto"
                />
                {/* {plans.map((plan) => {
                  const isSubscribed = subscriptions.some(
                    (value) => value._id == plan?.subscriptionId._id
                  );
                  return (
                    <div key={plan.subscriptionId._id}>
                      {isSubscribed ? (
                        <Button
                          type="button"
                          onClick={() =>
                            navigate(`/user/playCourse/${course?._id}`)
                          }
                          className="w-full"
                        >
                          Go to class
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <RadioGroup
                            onValueChange={(value) => {
                              setPaymentMethord(value);
                              setOption(false);
                            }}
                            defaultValue={paymentMethord}
                          >
                            <h6>Choose a payment option</h6>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Stripe" id="option-two" />
                              <Label htmlFor="Stripe">Stripe</Label>
                            </div>
                          </RadioGroup>
                          <div>
                            {course?.students?.some(
                              (value) => value._id == userId
                            ) ? (
                              <Button
                                type="button"
                                onClick={() =>
                                  navigate(`/user/playCourse/${course._id}`)
                                }
                                className="w-full"
                              >
                                Go to class
                              </Button>
                            ) : (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    disabled={option}
                                    type="button"
                                    className="w-full"
                                  >
                                    purchase
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure to purchase this course?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogAction type="button">
                                      Cancel
                                    </AlertDialogAction>
                                    <AlertDialogAction
                                      onClick={handleOrder}
                                      type="button"
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                          {subscriptions.length > 0 && (
                            <>
                              <div>
                                <h4 className="text-xs">OR</h4>
                                <div className="space-y-3">
                                  <div className="text-xs">
                                    get access to this course and also all the
                                    courses of this instructor
                                  </div>
                                  <Button
                                    className="w-full"
                                    onClick={() => onOpen()}
                                  >
                                    subscribe
                                  </Button>
                                </div>
                              </div>
                              <Drawer
                                isOpen={isOpen}
                                size={"full"}
                                onClose={onClose}
                              >
                                <DrawerContent>
                                  {(onClose) => (
                                    <>
                                      <DrawerHeader className="flex flex-col gap-1">
                                        Instructor subscriptions
                                      </DrawerHeader>
                                      <DrawerBody>
                                        {subscriptions.map((value, index) => (
                                          <div
                                            key={index}
                                            className="border w-25 h-[300px] rounded-1"
                                          >
                                            <h4 className=" underline">
                                              Personal Plan
                                            </h4>
                                            <div className="  m-1">
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
                                                  {value.description.map(
                                                    (val, index) => (
                                                      <li
                                                        className="text-xs"
                                                        key={index}
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
                                                    subscribe(value._id)
                                                  }
                                                  type="button"
                                                  className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                                                >
                                                  Start Subscription
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </DrawerBody>
                                      <DrawerFooter>
                                        <Button
                                          className="text-danger bg-light"
                                          onClick={onClose}
                                        >
                                          Close
                                        </Button>
                                      </DrawerFooter>
                                    </>
                                  )}
                                </DrawerContent>
                              </Drawer>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })} */}
                {course?.students?.some((user) => user._id == userId) ? (
                  <Button
                    type="button"
                    onClick={() => navigate(`/user/playCourse/${course._id}`)}
                    className="w-full"
                  >
                    Go to class
                  </Button>
                ) : subscriptions.length > 0 ? (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          className="w-full"
                        >
                          purchase
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure to purchase this course?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction type="button">
                            Cancel
                          </AlertDialogAction>
                          <AlertDialogAction
                            onClick={handleOrder}
                            type="button"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <div>
                      <h4 className="text-xs">OR</h4>
                      <div className="space-y-3">
                        <div className="text-xs">
                          get access to this course and also all the courses of
                          this instructor
                        </div>
                        <Button className="w-full" onClick={() => onOpen()}>
                          subscribe
                        </Button>
                      </div>
                    </div>
                    <Drawer isOpen={isOpen} size={"full"} onClose={onClose}>
                      <DrawerContent>
                        {(onClose) => (
                          <>
                            <DrawerHeader className="flex flex-col gap-1">
                              Instructor subscriptions
                            </DrawerHeader>
                            <DrawerBody>
                              {subscriptions.map((value, index) => (
                                <div
                                  key={index}
                                  className="border w-25 h-[300px] rounded-1"
                                >
                                  <h4 className=" underline">Personal Plan</h4>
                                  <div className="  m-1">
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
                                    <div className="flex items-end ">
                                      <Button
                                        onClick={() => subscribe(value._id)}
                                        type="button"
                                        className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                                      >
                                        Start Subscription
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </DrawerBody>
                            <DrawerFooter>
                              <Button
                                className="text-danger bg-light"
                                onClick={onClose}
                              >
                                Close
                              </Button>
                            </DrawerFooter>
                          </>
                        )}
                      </DrawerContent>
                    </Drawer>
                  </>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" className="w-full">
                        purchase
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure to purchase this course?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction type="button">
                          Cancel
                        </AlertDialogAction>
                        <AlertDialogAction onClick={handleOrder} type="button">
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetailesPage;
