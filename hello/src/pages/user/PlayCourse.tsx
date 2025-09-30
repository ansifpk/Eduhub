import type { ICourse } from "@/@types/courseType";
import type { IInstructorRating } from "@/@types/instructorRatingType";
import type { ILecture } from "@/@types/lectureType";
import type { IRating } from "@/@types/ratingType";
import type { IReport } from "@/@types/report";
import type { IUser } from "@/@types/userType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import {
  ratingScheema,
  type RatingFormInputs,
} from "@/util/schemas/ratingScheema";
import {
  reportScheema,
  type reportScheemaFormInputs,
} from "@/util/schemas/reportScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const labels: { [index: string]: string } = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const PlayCourse = () => {
  const [course, setCourse] = useState<ICourse>();
  const [chapter, setChapter] = useState<string|File>("");
  const [ratingId, setRatingId] = useState("");
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [reportAlertOpen, setReportAlertOpen] = useState(false);
  const [seeMoreEditAlertOpen, setSeeMoreEditAlertOpen] = useState(false);
  const [addOpenAlert, setAddOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lecture, setLecture] = useState<ILecture>();
  const [reports, setReports] = useState<IReport[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [instructorRatings, setInstructorRatings] = useState<
    IInstructorRating[]
  >([]);

  const { courseId } = useParams();
  const userId = useSelector((state: IUser) => state._id);
  const navigate = useNavigate();
  const { doRequest, err } = useRequest();

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

  const {
    register: registerReport,
    handleSubmit: handleSubmitReport,
    setValue: setValueReport,
    formState: { errors: reportErrors },
  } = useForm<reportScheemaFormInputs>({
    resolver: zodResolver(reportScheema),
    defaultValues: {
      report: "",
    },
  });

  useEffect(() => {
    doRequest({
      url: `${userRoutes.courseDeatiles}/${courseId}`,
      method: "get",
      body: {},
      onSuccess: async (res) => {
        setCourse(res.course);
        setLecture(res.course.sections.sections[0].lectures[0]);
        setChapter(res.course.sections.sections[0].lectures[0].content.video_url);
        doRequest({
          url: `${userRoutes.report}/${userId}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setReports(response.reports);
          },
        });
        doRequest({
          url: `${userRoutes.instructorRating}/${res.course.instructorId._id}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setInstructorRatings(response.ratings);
          },
        });
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setRatings(response.rating);
          },
        });
      },
    });
  }, [courseId]);

  const handleRating = (data: RatingFormInputs) => {
    setLoading(true);
    doRequest({
      url: userRoutes.ratingCourse,
      method: "post",
      body: { review: data.rating, stars: data.star, courseId, userId },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setLoading(false);
            setAddOpenAlert(false);
            setValue("star", 1);
            setValue("rating", "");
            toast.success("Successfully added your review ");
            setRatings(response.rating);
          },
        });
      },
    });
  };
  const editRating = (data: RatingFormInputs) => {
    setLoading(true);
    doRequest({
      url: `${userRoutes.ratingCourse}/${ratingId}`,
      method: "patch",
      body: { review: data.rating, stars: data.star },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setLoading(false);
            toast.success("Review updated successfully...");
            setRatings(response.rating);
            setValue("star", 1);
            setValue("rating", "");
            setEditAlertOpen(false);
            setSeeMoreEditAlertOpen(false);
          },
        });
      },
    });
  };

  const handleDeleteRating = (ratingId: string) => {
    setLoading(true);
    doRequest({
      url: `${userRoutes.ratingCourse}/${ratingId}`,
      method: "delete",
      body: {},
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setLoading(false);
            setRatings(response.rating);
            toast.success("Review deleted successfully..");
          },
        });
      },
    });
  };

  const handleReport = async (data: reportScheemaFormInputs, url: string) => {
    console.log("reported", data, url);
    setLoading(true);
    doRequest({
      url: `${userRoutes.report}/${userId}`,
      body: { content: url, courseId, report: data.report },
      method: "post",
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.report}/${userId}/${courseId}`,
          method: "get",
          body: {},
          onSuccess: (response) => {
            setReports(response.reports);
            setLoading(false);
            setValueReport("report", "");
            setReportAlertOpen(false);
            toast.success("reported successfully");
          },
        });
      },
    });
  };

  //   console.log("ratings");
  //   console.log("errors", errors);
  //   console.log("instructorRatings",instructorRatings);
  console.log("ctest", course?.test);

  useEffect(() => {
    setLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      <main className="w-full flex justify-center  gap-10    py-8">
        <div className="bg-white w-[650px]">
          <div className="flex items-center space-x-2 m-3">
            <button
              className="bg-teal-500 px-2 py-1 rounded cursor-pointer hover:bg-teal-300 "
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <div className="flex items-center justify-between bg-white border border-teal-400 rounded w-full ">
              <div className="p-3">
                <h6 className="text-s">{course?.title}</h6>
                <p className="font-medium text-xs text-muted-foreground">
                  {course?.sections.sections.length} contents
                </p>
              </div>
              <Dialog
                open={reportAlertOpen}
                onOpenChange={() => {
                  if (reportAlertOpen) {
                    setValueReport("report", "");
                  }
                  setReportAlertOpen(!reportAlertOpen);
                }}
              >
                {reports.find((rep) => rep.userId._id == userId) ? (
                  ""
                ) : (
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setReportAlertOpen(true)}
                      className="bg-red-500 px-2 py-1 rounded text-white font-semibold cursor-pointer mr-5"
                    >
                      Report
                    </button>
                  </DialogTrigger>
                )}

                <DialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <DialogTitle>Repot</DialogTitle>
                    <DialogDescription>
                      Your reporting the video {lecture?.title}. of course{" "}
                      {course?.title}
                    </DialogDescription>
                  </AlertDialogHeader>
                  <textarea
                    className="border border-teal-500 rounded h-30 p-2"
                    {...registerReport("report")}
                    placeholder="Type your mesage"
                  />
                  {reportErrors.report && (
                    <p className="text-red-500 text-sm">
                      {reportErrors.report.message}
                    </p>
                  )}
                  <div className="text-center">
                    <button
                      disabled={loading}
                      onClick={() =>
                        handleSubmitReport((data) =>
                          handleReport(
                            data,
                            lecture?.content.video_url as string
                          )
                        )()
                      }
                      type="button"
                      className="bg-red-500 rounded px-2 py-1 text-white font-semibold cursor-pointer"
                    >
                      {loading ? (
                        <>
                          Loading...
                          <span className="animate-spin inline-block text-lg">
                            <i className="bi bi-arrow-repeat"></i>
                          </span>
                        </>
                      ) : (
                        <>Report</>
                      )}
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="m-2">
            {chapter ? (
              <video
                src={chapter as string}
                autoPlay
                controls
                muted={false}
                controlsList="nodownload"
              />
            ) : (
              <p>Video not available</p>
            )}
            <div className="m-2">
              <Tabs defaultValue="Description" className="w-full ">
                <TabsList className="grid w-full grid-cols-3 bg-teal-400">
                  <TabsTrigger value="Description">Description</TabsTrigger>
                  <TabsTrigger value="Reviews&ratings">
                    Reviews & ratings
                  </TabsTrigger>
                  <TabsTrigger value="Instructor">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="Description">
                  <div>
                    <div className="space-y-2">
                      <div className="p-2">
                        <p className="font-bold">
                          {" "}
                          Title : {course?.thumbnail}
                        </p>
                        <p className="font-semibold">
                          Description : {course?.description}
                          <br />
                          <br />
                          category : {course?.category}
                          <br />
                          Topic : {course?.subCategory}
                          <br />
                          Price : {course?.price}
                          <br />
                          Level : {course?.level}
                          <br />
                          created At : {course?.createdAt.slice(0, 10)}
                        </p>
                        <div>
                          <h6 className="font-bold">Tests</h6>
                          <div>
                            {course?.test ? (
                              course.test?.students.some(
                                (val) => val.user == userId
                              ) ? (
                                <div className="flex flex-col w-25 h-[200px] gap-2">
                                  <div className="border rounded-2 shadow-lg w-full h-[150px]">
                                    <h4 className="font-medium text-sm ">
                                      Your Score
                                    </h4>
                                    <div className="flex h-full w-full items-center justify-center">
                                      <h1>
                                        {
                                          course.test.students.find(
                                            (val) => val.user == userId
                                          )?.score
                                        }
                                      </h1>
                                    </div>
                                  </div>
                                  <button
                                    disabled
                                    className="text-black  shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                                  >
                                    Test Attended
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col w-25 h-[200px] gap-2">
                                  <img
                                    className="border rounded-2 shadow-lg w-full h-[150px]"
                                    src={course.image.image_url}
                                  />
                                  <button
                                    className=" shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                                    onClick={() =>
                                      navigate(
                                        `/user/assesmentTest/${course.test._id}`
                                      )
                                    }
                                  >
                                  Go to test
                                  </button>
                                </div>
                              )
                            )
                             : (
                              "No Tests Available for this Course."
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Reviews&ratings">
                  <div>
                    <div className="space-y-2">
                      <div>
                        <h6 className="my-3">Reviews & Ratings</h6>
                        <div className="grid gap-2 grid-cols-2">
                          {ratings.length > 0 ? (
                            ratings.map((val: IRating, index) => (
                              <div
                                className="border border-teal-400 rounded"
                                key={index}
                              >
                                <div className="m-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex justify-center gap-3 items-center">
                                      <Avatar>
                                        <AvatarImage
                                          src={val.userId.avatar.avatar_url}
                                          alt="user profile"
                                        />
                                        <AvatarFallback>
                                          <i className="bi bi-person-circle text-2xl"></i>
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className="text-black font-medium">
                                        {val.userId.name}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Dialog
                                        open={editAlertOpen}
                                        onOpenChange={() => {
                                          setEditAlertOpen(!editAlertOpen);
                                          setValue("rating", val.review);
                                          setValue("star", val.stars);
                                        }}
                                      >
                                        <form>
                                          <DialogTrigger asChild>
                                            {val.userId._id == userId && (
                                              <i
                                                onClick={() => {
                                                  setRatingId(val._id);
                                                }}
                                                className="bi bi-pencil-square"
                                              ></i>
                                            )}
                                          </DialogTrigger>
                                          <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                              <DialogTitle>
                                                Edit Your Rating
                                              </DialogTitle>
                                              <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                            <div>
                                              {[...Array(5)].map((_, index) => {
                                                const star = watch("star");
                                                return (
                                                  <i
                                                    {...register("star")}
                                                    key={index}
                                                    onMouseEnter={() =>
                                                      setValue(
                                                        "star",
                                                        index + 1
                                                      )
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
                                            <div className="grid gap-4">
                                              <label htmlFor="rating">
                                                Enter your message
                                              </label>
                                              <textarea
                                                className="border border-teal-400 rounded py-2"
                                                {...register("rating")}
                                                id="rating"
                                                name="rating"
                                                placeholder="Enter your review here"
                                              />
                                              {errors.rating && (
                                                <p className="text-red-500 text-sm">
                                                  {errors.rating.message}
                                                </p>
                                              )}
                                            </div>

                                            <DialogFooter>
                                              <DialogClose
                                                onClick={() =>
                                                  setEditAlertOpen(
                                                    !editAlertOpen
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
                                                      <span className="animate-spin inline-block text-lg">
                                                        <i className="bi bi-arrow-repeat"></i>
                                                      </span>
                                                    </>
                                                  ) : (
                                                    <>Save changes </>
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
                                                      account and remove your
                                                      data from our servers.
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
                                                          editRating
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
                                        {val.userId._id == userId &&
                                          (loading ? (
                                            <i
                                              className={`bi bi-trash-fill`}
                                            ></i>
                                          ) : (
                                            <AlertDialogTrigger asChild>
                                              <i
                                                className={`bi bi-trash-fill cursor-pointer`}
                                              ></i>
                                            </AlertDialogTrigger>
                                          ))}
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete this
                                              review and remove data from our
                                              servers.
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
                                      <i className="bi bi-star-fill text-yellow-500">
                                        {" "}
                                        {val.stars} {labels[`${val.stars}`]}
                                      </i>
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
                            <div>No ratings for this course</div>
                          )}
                        </div>
                        <div className="flex justify-between ">
                          <Dialog>
                            <DialogTrigger className="text-indigo-600 underline cursor-pointer font-semibold">
                              {ratings.length > 0 && " See more..."}
                            </DialogTrigger>

                            <DialogTitle>
                              <DialogDescription></DialogDescription>
                              <DialogContent className="sm:max-w-[900px]">
                                <div>
                                  <h6 className="my-3">Reviews & Ratings</h6>
                                  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                    <div className="grid gap-2 grid-cols-2">
                                      {ratings.map((rating) => (
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
                                                        <i
                                                          onClick={() => {
                                                            setRatingId(
                                                              rating._id
                                                            );
                                                          }}
                                                          className="bi bi-pencil-square"
                                                        ></i>
                                                      )}
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                      <DialogHeader>
                                                        <DialogTitle>
                                                          Edit Your Rating
                                                        </DialogTitle>
                                                        <DialogDescription></DialogDescription>
                                                      </DialogHeader>
                                                      <div>
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
                                                                delete your
                                                                account and
                                                                remove your data
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
                                                                    editRating
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
                                                      userId &&
                                                      (loading ? (
                                                        <i
                                                          className={`bi bi-trash-fill`}
                                                        ></i>
                                                      ) : (
                                                        <AlertDialogTrigger
                                                          asChild
                                                        >
                                                          <i
                                                            className={`bi bi-trash-fill cursor-pointer`}
                                                          ></i>
                                                        </AlertDialogTrigger>
                                                      ))}
                                                  </AlertDialogTrigger>
                                                  <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                      <AlertDialogTitle>
                                                        Are you absolutely sure?
                                                      </AlertDialogTitle>
                                                      <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete this
                                                        review and remove data
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
                                                        onClick={() =>
                                                          handleDeleteRating(
                                                            rating._id
                                                          )
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

                          <Dialog
                            open={addOpenAlert}
                            onOpenChange={() => {
                              setValue("rating", "");
                              setValue("star", 1);
                              setAddOpenAlert(!addOpenAlert);
                            }}
                          >
                            <form>
                              <DialogTrigger className="text-indigo-600 cursor-pointer underline font-semibold">
                                {!ratings.find(
                                  (rat) => rat.userId._id == userId
                                ) && "Rate this course"}
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
                                          This action cannot be undone. This
                                          will permanently save data from our
                                          servers.
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
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Instructor">
                  <div>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-lg">Instructor info</p>
                        <div className="flex bg-blue-200 rounded-3">
                          <Avatar
                            onClick={() =>
                              navigate(
                                `/user/instructorProfile/${course?.instructorId._id}`
                              )
                            }
                            className="w-48 h-48 m-2 rounded-full justify-center flex items-center overflow-hidden bg-gray-200"
                          >
                            <AvatarImage
                              src={course?.instructorId.avatar.avatar_url}
                            />
                            <AvatarFallback>
                              <i className="bi bi-person-circle text-5xl"></i>
                            </AvatarFallback>
                          </Avatar>

                          <div className="m-2 w-[400px] bg-gray-50/50 backdrop-blur-sm">
                            <div className="m-4 space-y-2 overflow-hidden break-words">
                              <div className="font-bold text-black">
                                {course?.instructorId.name}
                              </div>
                              <div className="font-bold">{"im developer"}</div>
                              <div className="font-bold text-black">
                                {"about me"}
                              </div>
                              <div className="flex items-center">
                                <p className="text-sm font-medium">
                                  <i className="bi bi-star-fill text-yellow-500"></i>
                                </p>
                                <p className="font-light">
                                  {instructorRatings.length} instructor Ratings
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="w-[400px] mt-3 ">
          <div className="bg-white border border-teal-500 rounded ">
            <div className="m-3 space-y-2">
              <p className="font-bold">Course contents</p>

              {course &&
                course.sections.sections.map((section, index) => (
                  <Accordion
                    key={index}
                    type="multiple"
                    className="w-full  border-1 border-teal-500 rounded"
                  >
                    <AccordionItem value={`Section - ${index + 1}`}>
                      <AccordionTrigger className="cursor-pointer">
                        <span className="font-bold px-4">
                          {section.sectionTitle}
                        </span>
                      </AccordionTrigger>
                      {section.lectures.map((lecture, ind) => (
                        <AccordionContent
                          key={ind}
                          onClick={() => {
                            setLecture(lecture);
                            setChapter(lecture.content.video_url);
                          }}
                          className="flex justify-between py-2 my-1 border-top bg-white mx-2"
                        >
                          <div className="cursor-pointer flex gap-2">
                            <span>{lecture.title}</span>
                            {chapter == lecture.content.video_url && (
                              <i className="bi bi-play-circle"></i>
                            )}
                          </div>
                          <div>{lecture.duration}</div>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  </Accordion>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(PlayCourse);
