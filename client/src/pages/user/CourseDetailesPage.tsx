import { useEffect, useState } from "react";
import { ICourse } from "../../@types/courseType";
import { IRating } from "../../@types/ratingType";
import { User } from "../../@types/userType";
import { ISubcription } from "../../@types/subscriptionType";
import useRequest from "../../hooks/useRequest";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import userRoutes from "../../service/endPoints/userEndPoints";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { IUserSubscribe } from "../../@types/userSubscribe";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Label } from "../../components/ui/label";
import Footer from "../../components/Footer/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
const CourseDetailesPage = () => {
  const [course, setCourse] = useState<ICourse>();
  const [ratings, setRatings] = useState<IRating[]>([]);
  const { courseId } = useParams();
  const userId = useSelector((state: User) => state.id);
  const [val, setVal] = useState<number | null>(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const { doRequest } = useRequest();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    ratingError: false,
  });
  const labels: { [index: string]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  useEffect(() => {
    doRequest({
      url: `${userRoutes.courseDeatiles}/${courseId}`,
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
      },
    });

    doRequest({
      url: `${userRoutes.ratingCourse}/${courseId!}`,
      method: "get",
      body: {},
      onSuccess: (ratings) => {
        setRatings(ratings.rating);
      },
    });

    doRequest({
      url: `${userRoutes.plans}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (plans) => {
        setPlans(plans.plans);
      },
    });
  }, [courseId]);

  const handleOrder = async () => {
    try {
      doRequest({
        url: userRoutes.stripePurchase,
        body: { course: [course!], userId, couponCode: "" },
        method: "post",
        onSuccess: async (data) => {
          await stripe?.redirectToCheckout({
            sessionId: data.id,
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  let wr =
    "Hi everyone, I’m Ansif, a student on Udemy, and I’m excited to be here! This website has been incredibly helpful in my learning journey, and I’m looking forward to making the most of it. Can’t wait to dive into more knowledge and improve my skills!  and ibelieve also everyone feels this same Hi everyone, I’m Ansif, a student on Udemy, and I’m excited to be here! This website has been incredibly helpful in my learning journey, and I’m looking forward to making the most of it. Can’t wait dive into";

  const handleEditRatings = async (ratingId: string) => {
    doRequest({
      url: userRoutes.ratingCourse,
      body: { ratingId, review, stars },
      method: "patch",
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId!}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setRatings(ratings.rating);
            setVal(1);
            setStars(0!);
            setReview("");
            return toast.success("Review edit successfully..");
          },
        });
      },
    });
  };

  const handleDeleteRating = async (ratingId: string) => {
    doRequest({
      url: `${userRoutes.ratingCourse}/${ratingId}`,
      method: "delete",
      body: {},
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId!}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setRatings(ratings.rating);
            toast.success("Review deleted successfully..");
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
 

  return (
    <div className="bg-blue-200">
      <Header />
      <div className="flex bg-gray-900 w-full  h-[250px] ">
        <img
          src={course?.image.image_url}
          className="md:h-[220px] md:w-[350px] w-full object-fill m-3"
          alt=""
        />
        <div className="md:block hidden w-full ">
          <h3 className="text-white m-3">Title : {course?.title}</h3>
          <h3 className="text-white m-3">About : {course?.thumbnail}</h3>
          <div className="flex m-3 gap-3 space-y-1 items-center">
            {
              course?.instructorId.avatar.avatart_url?
              <Avatar>
                <AvatarImage
                  src={course?.instructorId.avatar.avatart_url}
                  alt="instrutcor profile"
                />
               </Avatar> 
               :
               <i className="bi bi-person-circle text-white"></i>
            }
            
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
      <div className="md:hidden bg-white w-full pl-3 m-2">
        <p className="font-semibold text-3xl">{course?.title}</p>
        <p>{course?.thumbnail}</p>
      </div>

      {/* course content */}
      <div className="flex md:mx-5 md:gap-5 gap-2 mt-4 ">
        <div className="md:w-[800px] w-[300px] bg-white rounded-2xl ">
          <span className="text-black text-3xl font-semibold m-2 underline">corse content</span>
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
            <span className="my-4 ml-5 text-2xl font-semibold ">Discription</span>
            <div className="ml-5">
              {course?.thumbnail}
              <br />
              {course?.description}
            </div>
          </div>
          {/* reviews start */}
          <div className="m-3">
            <span className="text-2xl font-semibold">Reviews</span>
            <div className="grid gap-2 grid-cols-2 ">
              {ratings.length > 0 ? (
                ratings.slice(0, 4).map((value, index) => (
                  <div className="border" key={index}>
                    <div className="m-3">
                      <div className="flex items-center justify-between">
                        <div className="flex  gap-3 items-center">
                          <Avatar>
                            {value.userId.avatar.avatar_url ? (
                              <AvatarImage
                                src={value.userId.avatar.avatar_url}
                                alt="user profile"
                              />
                            ) : (
                              <i className="bi bi-person-circle"></i>
                            )}
                          </Avatar>
                          <span className="text-black font-medium">
                            {value.userId.name}
                          </span>
                        </div>
                        <div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              {value.userId._id == userId && (
                                <i
                                  className="bi bi-pencil-square cursor-pointer"
                                  onClick={() => {
                                    setReview(value.review);
                                    setStars(value.stars);
                                    setVal(value.stars);
                                  }}
                                ></i>
                              )}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Edit your Review
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                      <i
                                        key={index}
                                        className={`bi ${
                                          ratingValue <= (val || stars)
                                            ? "bi-star-fill"
                                            : "bi-star"
                                        } mx-1`}
                                        style={{
                                          fontSize: "1.5rem",
                                          color: "#ffc107",
                                          opacity:
                                            ratingValue <= (val || stars)
                                              ? 1
                                              : 0.55,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => setStars(ratingValue)}
                                        onMouseEnter={() => setVal(ratingValue)}
                                        onMouseLeave={() => setVal(0)}
                                      />
                                    );
                                  })}

                                  <Label
                                    className={
                                      errors.ratingError ? "text-danger" : ""
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
                                    <span className="text-sm text-danger text-muted-foreground">
                                      Your message will be show to the public.
                                    </span>
                                  ) : (
                                    <span className="text-sm text-muted-foreground">
                                      Your message will be show to the public.
                                    </span>
                                  )}
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
                                  onClick={() => handleEditRatings(value._id)}
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
                                <i className="bi bi-trash3-fill cursor-pointer"></i>
                              )}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this review and remove data
                                  from our servers.
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
                                  onClick={() => handleDeleteRating(value._id)}
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
                          <i className="bi bi-star-fill text-amber-500 ">
                            {value.stars} {labels[`${value.stars}`]}
                          </i>
                        </div>
                        {value.review}
                      </div>
                      <p className="text-black font-medium text-xs">
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
                                {value.userId.avatar.avatar_url ? (
                                  <AvatarImage
                                    src={value.userId.avatar.avatar_url}
                                    alt="user profile"
                                  />
                                ) : (
                                  <i className="bi bi-person-circle"></i>
                                )}
                              </Avatar>
                              <p className="text-black font-medium">
                                {value.userId.name}
                              </p>
                            </div>
                            <div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  {value.userId._id == userId && (
                                    <i
                                      className="bi bi-pencil-square cursor-pointer"
                                      onClick={() => {
                                        setReview(value.review);
                                        setStars(value.stars);
                                        setVal(value.stars);
                                      }}
                                    ></i>
                                  )}
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Edit your Review
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                          <i
                                            key={index}
                                            className={`bi ${
                                              ratingValue <= (val || stars)
                                                ? "bi-star-fill"
                                                : "bi-star"
                                            } mx-1`}
                                            style={{
                                              fontSize: "1.5rem",
                                              color: "#ffc107",
                                              opacity:
                                                ratingValue <= (val || stars)
                                                  ? 1
                                                  : 0.55,
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setStars(ratingValue)
                                            }
                                            onMouseEnter={() =>
                                              setVal(ratingValue)
                                            }
                                            onMouseLeave={() => setVal(0)}
                                          />
                                        );
                                      })}

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
                                        <span className="text-sm text-danger text-muted-foreground">
                                          Your message will be show to the
                                          public.
                                        </span>
                                      ) : (
                                        <span className="text-sm text-muted-foreground">
                                          Your message will be show to the
                                          public.
                                        </span>
                                      )}
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
                                    <i className="bi bi-trash3-fill cursor-pointer"></i>
                                  )}
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete this review and remove
                                      data from our servers.
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
                              <i className="bi bi-star-fill text-amber-500 ">
                                {value.stars} {labels[`${value.stars}`]}
                              </i>
                            </div>
                            {value.review}
                          </div>
                          <p className="text-black font-medium text-xs">
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
          {/* reviews end  */}
          {/* intructor profile  */}
          <span className="text-2xl  md:block hidden font-semibold underline mx-2">
            Intructor Info :{" "}
          </span>
          <div className="border hidden shadow-lg rounded-full mx-1 md:flex gap-5 items-center">
            <div
              onClick={() =>
                navigate(`/user/instructorProfile/${course?.instructorId._id}`)
              }
              className="md:w-48 w-24 h-24 md:h-48 m-2 rounded-full   overflow-hidden bg-gray-200 flex items-center justify-center"
            >
              {course?.instructorId.avatar.avatart_url ? (
                <img
                  src={course?.instructorId.avatar.avatart_url}
                  alt="instructor image"
                  className="w-full h-full"
                />
              ) : (
                <i
                  className="bi bi-person-circle text-black text-5xl" 
                ></i>
              )}
            </div>
            <div className=" m-2 md:w-[500px] rounded shadow-lg ">
              <div className="md:font-bold text-black">
                {course?.instructorId.name}
              </div>
              <div className="md:font-bold">{"im developer"}</div>
              <div className="md:font-bold text-xs text-black">{wr}</div>
            </div>
          </div>
          {/* intructor profile end */}
        </div>
        
        {/* course purchase  */}
        <div className="md:w-[400px] w-[250px] border h-[10px] sticky top-0rounded-lg shadow-lg">
          <div className="flex flex-col  gap-3 mb-4 last:mb-0 bg-white">
            <img
              src={course?.image.image_url}
              alt={"review.name"}
              className="w-auto h-auto"
            />
            {course?.students?.some((user) => user._id === userId) ? (
              <Button
                type="button"
                onClick={() => navigate(`/user/playCourse/${course._id}`)}
                className="w-full"
              >
                Go to class
              </Button>
            ) : subscriptions.length > 0 ? (
              (() => {
                const isSubscribed = subscriptions.some((sub) =>
                  plans.some((plan) => sub._id === plan.subscriptionId._id)
                );
                return isSubscribed ? (
                  <Button
                    type="button"
                    onClick={() => navigate(`/user/playCourse/${course?._id}`)}
                    className="w-full"
                  >
                    Go to class
                  </Button>
                ) : (
                  <>
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
                          <AlertDialogAction
                            onClick={handleOrder}
                            type="button"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {subscriptions.length > 0 && (
                      <div>
                        <h4 className="text-xs">OR</h4>
                        <div className="space-y-3">
                          <div className="text-xs">
                            get access to this course and also all the courses
                            of this instructor
                          </div>
                          <Sheet key={"bottom"}>
                            <SheetTrigger asChild>
                              <Button className="w-full">subscribe</Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-screen">
                              <SheetHeader>
                                <SheetTitle>
                                  {" "}
                                  Instructor Subscriptions
                                </SheetTitle>
                                <SheetDescription>
                                  {/* Make changes to your profile here. Click save when you're done. */}
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid grid-cols-6 mx-2">
                                {subscriptions.map((value, index) => (
                                  <div
                                    key={index}
                                    className="border w-50 h-[300px] rounded-1"
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
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        {/* course purchase end */}
      </div>
      {/* course content end */}
      <div className=" md:hidden items-center mt-5 w-full md:rounded-full rounded-lg mx-1 flex gap-5 bg-white">
            <div
              onClick={() =>
                navigate(`/user/instructorProfile/${course?.instructorId._id}`)
              }
              className="flex items-center text-center w-60  m-2 rounded-full   overflow-hidden"
            >
              {course?.instructorId.avatar.avatart_url ? (
                <img
                  src={course?.instructorId.avatar.avatart_url}
                  alt="instructor image"
                  className="w-full h-full"
                />
              ) : (
                <i className="bi bi-person-circle text-3xl" ></i>
              )}
            </div>
            <div className=" m-2 md:w-[500px]  md:rounded  shadow-lg ">
              <div className="md:font-bold text-black">
                {course?.instructorId.name}
              </div>
              <div className="md:font-bold">{"im developer"}</div>
              <div className="md:font-bold text-xs text-black">{wr}</div>
            </div>
          </div>
      <Footer />
    </div>
  );
};

export default CourseDetailesPage;
