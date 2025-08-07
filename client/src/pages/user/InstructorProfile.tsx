import { ICourse } from "../../@types/courseType";
import { IRating } from "../../@types/ratingType";
import { User } from "../../@types/userType";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Textarea } from "../../components/ui/textarea";
import toast from "react-hot-toast";
import { IUser } from "../../@types/chatUser";
import { useSelector } from "react-redux";
import moment from "moment";
import { ISubcription } from "../../@types/subscriptionType";
import { IUserSubscribe } from "../../@types/userSubscribe";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";
const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);

const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [user, setUser] = useState<IUser>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [reviews, setReviews] = useState<IRating[]>([]);
  const [value, setValue] = useState<number | null>(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state: User) => state.id);
  const [subscriptions, setSubscriptions] = useState<ISubcription[]>([]);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const { doRequest, errors } = useRequest();

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
        setCourses(res.courses);
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
  }, []);

  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

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

  const handleEditRatings = async (ratingId: string) => {
    await doRequest({
      url: userRoutes.instructorRating,
      body: { ratingId, review, stars },
      method: "patch",
      onSuccess: async () => {
        await doRequest({
          url: `${userRoutes.instructorRating}/${instructorId}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setReviews(ratings.ratings);
            setValue(1);
            setStars(0!);
            setReview("");
            return toast.success("Review edit successfully..");
          },
        });
      },
    });
  };

  const handleDeleteRating = async (ratingId: string) => {
    await doRequest({
      url: `${userRoutes.instructorRating}/${ratingId}`,
      method: "delete",
      body: {},
      onSuccess: async () => {
        await doRequest({
          url: `${userRoutes.instructorRating}/${instructorId}`,
          method: "get",
          body: {},
          onSuccess: (ratings) => {
            setReviews(ratings.rating);
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

  const createMessageWithUser = async (recipientId: string) => {
    try {
      await doRequest({
        url: userRoutes.chat,
        method: "post",
        body: { userId, recipientId, role: "userToInstructor" },
        onSuccess: (response) => {
          return navigate(`/profile/message?chatId=${response.chat._id}`);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  let wr =
    "Hi everyone, I’m Ansif, a student on EduHub, and I’m thrilled to be here! This platform has been incredibly helpful in my learning journey. The variety of courses available, taught by expert instructors, has allowed me to dive deep into new areas and build valuable skills. What I love most about EduHub is the supportive community of like-minded learners who share the same passion for growth. With flexible learning options and expert guidance, EduHub makes it easy for anyone to improve their skills. I’m excited to continue learning and growing here, and I hope you are too!";

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

  return (
    <div className="bg-blue-200">
      <Header />
      <div className="bg-white mx-5 mt-16">
        <div>
          <div
            className="flex bg-blue-200 rounded-3 items-center justify-center mx-3"
            style={{
              backgroundImage: `linear-gradient(
                      rgba(4, 18, 19, 0.5),
                  rgba(10, 10, 10, 0.5)
                    ), url(https://github.com/shadcn.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-48 h-48 m-2 rounded-full flex items-center overflow-hidden justify-center bg-gray-200">
              {user?.avatar.avatar_url ? (
                <img src={user?.avatar.avatar_url} alt="instructor image" />
              ) : (
                <i className="bi bi-person-circle text-black text-6xl"></i>
              )}
            </div>

            <Card className="m-2 w-[800px] bg-gray-50/50 backdrop-blur-sm">
              <CardContent className=" space-y-2 overflow-hidden break-words">
                <div className="font-bold text-black">{user?.name}</div>
                <div className="text-sm">{wr}</div>
                <div className="flex items-center">
                  <p className="">
                    {" "}
                    <i className="bi bi-star-fill text-yellow-600"></i>2
                    instructor Ratings
                  </p>
                </div>
                <div
                  onClick={() => createMessageWithUser(user?._id!)}
                  className="flex items-center cursor-pointer text-primary"
                >
                  Message <Send className="h-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <Tabs defaultValue="Courses" className="w-full my-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Courses">Courses</TabsTrigger>
              <TabsTrigger value="Reviews">Reviews</TabsTrigger>
              <TabsTrigger value="Subscriptions">Subscriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="Courses">
              <Card className="mx-3">
                <CardContent>
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
                            <div className=" text-sm m-2 ">
                              <div className="flex flex-wrap ">
                                <h6 className="font-medium leading-none overflow-hidden break-words">
                                  {"course.title"}
                                </h6>
                              </div>
                              <p className="font-medium text-xs text-muted-foreground">
                                Created : {course.instructorId.name} <br />
                                Price: {course.price}
                              </p>
                              {course.students?.some((v) => v._id == userId) ? (
                                <Button
                                  type="button"
                                  onClick={() =>
                                    navigate(`/user/playCourse/${course?._id}`)
                                  }
                                  className="w-full bg-teal-500 hover:bg-teal-400"
                                >
                                  Go to Class
                                </Button>
                              ) : (
                                <>
                                  {plans.map((plan) => {
                                    const isSubscribed = subscriptions.some(
                                      (value) =>
                                        value._id === plan.subscriptionId._id
                                    );
                                    return (
                                      <div key={plan.subscriptionId._id}>
                                        {isSubscribed ? (
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              navigate(
                                                `/user/playCourse/${course?._id}`
                                              )
                                            }
                                            className="w-full"
                                          >
                                            Go to Class
                                          </Button>
                                        ) : (
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              navigate(
                                                `/users/courseDetailes/${course._id}`
                                              )
                                            }
                                            className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                                          >
                                            View Details
                                          </Button>
                                        )}
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Reviews">
              <Card className="mx-3">
                <CardContent>
                  <ScrollArea className="w-full h-[350px]  rounded-md border">
                    <div className="m-3">
                      <h6>Reviews</h6>

                      <div className="grid gap-2 grid-cols-2 ">
                        {reviews?.length > 0 ? (
                          reviews.map((val, index) => (
                            <div className=" border" key={index}>
                              <div className="m-3">
                                <div className="flex  justify-between items-center">
                                  <div className="flex gap-3">
                                    <Avatar>
                                      {val?.userId.avatar.avatar_url ? (
                                        <AvatarImage
                                          src={val?.userId.avatar.avatar_url}
                                          alt="instrutcor profile"
                                        />
                                      ) : (
                                        <i className="bi bi-person-circle text-2xl"></i>
                                      )}
                                    </Avatar>
                                    <p className="text-black font-medium">
                                      {val.userId.name}
                                    </p>
                                  </div>
                                  <div>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        {val.userId._id == userId && (
                                          <i
                                            onClick={() => {
                                              setReview(val.review);
                                              setStars(val.stars);
                                              setValue(val.stars);
                                            }}
                                            className="bi bi-pencil-square cursor-pointer"
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
                                                    ratingValue <=
                                                    (value || stars)
                                                      ? "bi-star-fill"
                                                      : "bi-star"
                                                  } mx-1`}
                                                  style={{
                                                    fontSize: "1.5rem",
                                                    color: "#ffc107",
                                                    opacity:
                                                      ratingValue <=
                                                      (value || stars)
                                                        ? 1
                                                        : 0.55,
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    setStars(ratingValue)
                                                  }
                                                  onMouseEnter={() =>
                                                    setValue(ratingValue)
                                                  }
                                                  onMouseLeave={() =>
                                                    setValue(0)
                                                  }
                                                />
                                              );
                                            })}

                                            <Label htmlFor="message-2">
                                              Your Message
                                            </Label>
                                            <Textarea
                                              value={review}
                                              onChange={(e) => {
                                                setReview(e.target.value);
                                              }}
                                              placeholder="Type your message here."
                                              id="message-2"
                                            />
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
                                              handleEditRatings(val._id)
                                            }
                                            disabled={review.length <= 0}
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
                                        {val.userId._id == userId && (
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
                                              handleDeleteRating(val._id)
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
                                    {val.stars}
                                    <i className="bi bi-star-fill text-yellow-600"></i>{" "}
                                    {labels[`${val.stars}`]}
                                  </div>
                                  {val.review}
                                </div>
                                <p className="text-black font-medium text-xs">
                                  {" "}
                                  {moment(val.updatedAt).calendar()}
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
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Subscriptions">
              <Card className="mx-3">
                <CardContent>
                  <ScrollArea>
                    <div className="relative flex">
                      <div className="flex  mx-5 my-4 gap-3 m-auto ">
                        {subscriptions.map((value, index) => (
                          <div
                            key={index}
                            className="border w-full h-[300px] rounded-1"
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
                                    <Button
                                      type="button"
                                      onClick={() => goToDetailes(customerId)}
                                      className="w-full"
                                    >
                                      View detailes
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => subscribe(value._id)}
                                      type="button"
                                      className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                                    >
                                      Start Subscription
                                    </Button>
                                  );
                                })()
                              ) : (
                                <>
                                  <Button
                                    onClick={() => subscribe(value._id)}
                                    type="button"
                                    className="w-full bg-teal-500 hover:bg-teal-500 text-white"
                                  >
                                    Start Subscription
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorProfile;
