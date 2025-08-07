import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import { ICourse } from "../../@types/courseType";
import { Button } from "../../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useSelector } from "react-redux";
import { User } from "../../@types/userType";
import { IRating } from "../../@types/ratingType";
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
import moment from "moment";
import { IInstructorRating } from "../../@types/instructorRatingType";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { ILecture } from "../../@types/lectureType";
import { IReport } from "../../@types/report";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";
import ProfileNavbar from "../../components/Header/ProfileNavbar";
import Header from "../../components/Header/Header";


const PlayCourse: React.FC = () => {
  const [course, setCourse] = useState<ICourse>();
  const [chapter, setChapter] = useState("");
  const [lecture, setLecture] = useState<ILecture>();
  const [reports, setReports] = useState<IReport[]>([]);
  const [value, setValue] = useState<number | null>(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [report, setReport] = useState("");
  const [ratings, setRatings] = useState<IRating[]>([]);
  const {doRequest,errors} = useRequest();
  const [instructorRatings, setInstructorRatings] = useState<
    IInstructorRating[]
  >([]);
  const [error, setErrors] = useState({
    ratingError: true,
  });
  const userId = useSelector((state: User) => state.id);
  const userEmail = useSelector((state: User) => state.email);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    doRequest({
      url:`${userRoutes.courseDeatiles}/${courseId}`,
      method:"get",
      body:{},
      onSuccess:async (course)=>{
        setCourse(course.course);
        setLecture(course.course.sections[0].lectures[0]);
        setChapter(course.course.sections[0].lectures[0].content.video_url);
        await doRequest({
          url:`${userRoutes.report}/${userId}/${courseId}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setReports(response.reports);}
        });
        await doRequest({
          url:`${userRoutes.instructorRating}/${course.course.instructorId._id}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setInstructorRatings(response.ratings)
          }
        });
        await doRequest({
          url:`${userRoutes.ratingCourse}/${courseId}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setRatings(response.rating);
          }
        });
      }
    }); 
  }, [courseId]);

  const labels: { [index: string]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };


  const handleRating = async () => {
    doRequest({
      url:userRoutes.ratingCourse,
      method:"post",
      body:{review,stars,courseId,userId},
      onSuccess:()=>{
        setValue(1);
        setStars(0!);
        setReview("");
        doRequest({
          url:`${userRoutes.ratingCourse}/${courseId}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setRatings(response.rating);
          }
        })
      }
    })
  };

  const handleEditRatings = async (ratingId: string) => {

await doRequest({
  url:userRoutes.ratingCourse,
  method:"patch",
  body:{ratingId,review,stars},
  onSuccess:async()=>{
   await doRequest({
      url:`${userRoutes.ratingCourse}/${courseId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        toast.success("Review updated successfully...")
        setRatings(response.rating);
        setValue(1);
        setStars(0!);
        setReview("");
      }
    })
  }
})
  };

  const handleDeleteRating = async (ratingId: string) => {
   await doRequest({
      url:`${userRoutes.ratingCourse}/${ratingId}`,
      method:"delete",
      body:{},
      onSuccess:async()=>{
       await doRequest({
          url:`${userRoutes.ratingCourse}/${courseId}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setRatings(response.rating);
            toast.success("Review deleted successfully..");
          }
        })
      }
    })
  };

  const handleInstructorRating = async () => {

   await doRequest({
      url:`${userRoutes.instructorRating}`,
      method:"post",
      body:{instructorId:course?.instructorId._id,userId,review,stars},
      onSuccess:async()=>{
       await doRequest({
          url:`${userRoutes.instructorRating}/${course?.instructorId._id}`,
          method:"get",
          body:{},
          onSuccess:(response)=>{
            setStars(1);
            setReview("");
            setInstructorRatings(response.ratings);
            return toast.success("instrutcor rated succesfuly...");
          }
        });
      }
    });
  };

  const handleReport = async (url: string) => {
    doRequest({
      url:`${userRoutes.report}/${userId}`,
      body:{content:url,courseId,report},
      method:"post",
      onSuccess:()=>{
        setReport("");
        toast.success("reported successfully");
      }
    });
  };

useEffect(()=>{
errors?.map((err)=>toast.error(err.message))
},[errors]);

  return (
    <div className="bg-blue-100">
      <Header />
      <ProfileNavbar />
      <main className="w-full flex justify-center  gap-10    py-8">
        <div className="bg-white w-[650px]">
          <div className="flex items-center space-x-2 m-3">
            <Button
              className="bg-[#49BBBD] hover:bg-[#49BBBD]"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
            <div className="flex items-center justify-between bg-white border rounded-4 w-full ">
              <div className="p-3">
                <h6 className="text-s">{course?.title}</h6>
                <p className="font-medium text-xs text-muted-foreground">
                  {course?.sections.length} contents
                </p>
              </div>
              <Dialog>
                {
                  reports.map((val)=>val.userId._id==userId&&val.content==chapter)?"": <DialogTrigger asChild>
                  <Button className="bg-destructive mr-5">
                    Report
                  </Button>
                </DialogTrigger>
                }
             
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Repot</DialogTitle>
                  <DialogDescription>
                    Your reporting the video {lecture?.title}. of course{" "}
                    {course?.title}
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  placeholder="Type your mesage"
                />
                <DialogFooter className="sm:justify-center">
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleReport(chapter)}
                      disabled={report.length > 0 ? false : true}
                      type="button"
                      className="bg-destructive"
                    >
                      Report
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>
          </div>
          <div className="m-2">
            {chapter ? (
              <video
                src={chapter}
                autoPlay
                controls
                muted={false}
                controlsList="nodownload"
              />
            ) : (
              <p>Video not available</p>
            )}
            <div className="m-2">
              <Tabs defaultValue="Description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="Description">Description</TabsTrigger>
                  <TabsTrigger value="Reviews&ratings">
                    Reviews & ratings
                  </TabsTrigger>
                  <TabsTrigger value="Instructor">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="Description">
                  <Card>
                    <CardContent className="space-y-2">
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
                              course.test.students.some(
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
                                  <Button
                                    disabled
                                    className="text-black  shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                                  >
                                    Test Attended
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col w-25 h-[200px] gap-2">
                                  <img
                                    className="border rounded-2 shadow-lg w-full h-[150px]"
                                    src={course.image.image_url}
                                  />
                                  <Button
                                    className=" shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                                    onClick={() =>
                                      navigate(
                                        `/user/assesmentTest/${course.test._id}`
                                      )
                                    }
                                  >
                                    Go to test
                                  </Button>
                                </div>
                              )
                            ) : (
                              "No Tests Available for this Course."
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="Reviews&ratings">
                  <Card>
                    <CardContent className="space-y-2">
                      <div>
                        <h6 className="my-3">Reviews & Ratings</h6>
                        <div className="grid gap-2 grid-cols-2">
                          {ratings.length > 0 ? (
                            ratings.map((val: IRating, index) => (
                              <div className="border" key={index}>
                                <div className="m-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex justify-center gap-3 items-center">
                                      <Avatar>
                                        {
                                          val.userId.avatar.avatar_url?
                                          <AvatarImage
                                          src={
                                            val.userId.avatar.avatar_url
                                          }
                                          alt="user profile"
                                        />
                                          :
                                          <i className="bi bi-person-circle text-2xl"></i>
                                        }
                                      
                                      </Avatar>
                                      <p className="text-black font-medium">
                                        {val.userId.name}
                                      </p>
                                    </div>
                                    <div>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          {val.userId._id == userId && (
                                            <i onClick={() => {
                                              setReview(val.review);
                                              setStars(val.stars);
                                              setValue(val.stars);
                                            }} className="bi bi-pencil-square"></i>
                                       
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

                                              <Label
                                                className={
                                                  error.ratingError
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
                                              {error.ratingError ? (
                                                <span className="text-sm text-danger text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
                                                </span>
                                              ) : (
                                                <span className="text-sm text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
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
                                              onClick={() =>
                                                handleEditRatings(val._id)
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
                        <div className="flex justify-between">
                          <Dialog>
                            <DialogTrigger asChild>
                              {ratings.length > 4 && (
                                <Button className="underline" variant="link" 
                            
                              >
                                  See more...
                                </Button>
                              )}
                            </DialogTrigger>
                            <DialogTitle>
                              <DialogContent className="sm:max-w-[900px]">
                                <div>
                                  <h6 className="my-3">Reviews & Ratings</h6>
                                  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                    <div className="grid gap-2 grid-cols-2">
                                      <div className="border">
                                        <div className="m-3">
                                          <div className="flex  gap-3 items-center">
                                            <Avatar>
                                              <AvatarImage
                                                src={
                                                  course?.instructorId.avatar
                                                    .avatart_url
                                                    ? course?.instructorId
                                                        .avatar.avatart_url
                                                    : "https://github.com/shadcn.png"
                                                }
                                                alt="instrutcor profile"
                                              />
                                            </Avatar>
                                            <p className="text-black font-medium">
                                              {"ansif pk"}
                                            </p>
                                          </div>
                                          <div className="text-sm my-2">
                                            this is ma very nyse course . really
                                            usefull course from...
                                          </div>
                                          <p className="text-black font-medium text-xs">
                                            {" "}
                                            {"12/4/2002"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </ScrollArea>
                                </div>
                              </DialogContent>
                            </DialogTitle>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              {ratings.some(
                                (value) => value.userId.email == userEmail
                              ) ? (
                                ""
                              ) : (
                                <Button className="underline" variant="link">
                                  Rate this course
                                </Button>
                              )}
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  How whould you Rate this course?
                                </DialogTitle>
                                <DialogDescription>
                                  {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                      <i
                                        key={index}
                                        className={`bi ${
                                          ratingValue <= (value || stars)
                                            ? "bi-star-fill"
                                            : "bi-star"
                                        } mx-1`}
                                        style={{
                                          fontSize: "1.5rem",
                                          color: "#ffc107",
                                          opacity:
                                            ratingValue <= (value || stars)
                                              ? 1
                                              : 0.55,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => setStars(ratingValue)}
                                        onMouseEnter={() =>
                                          setValue(ratingValue)
                                        }
                                        onMouseLeave={() => setValue(0)}
                                      />
                                    );
                                  })}

                                  <Label
                                    className={
                                      error.ratingError ? "text-danger" : "text-black"
                                    }
                                    htmlFor="message-2"
                                  >
                                    Your Message
                                  </Label>
                                  <Textarea
                                   className="text-black"
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
                                  {error.ratingError ? (
                                    <span className="text-sm text-danger ">
                                      Your message will be show to the public.
                                    </span>
                                  ) : (
                                    <span className="text-sm ">
                                      Your message will be show to the public.
                                    </span>
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                <Button type="button"     className="bg-teal-500 hover:bg-teal-500">
                                    cancell
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="button"     className="bg-teal-500 hover:bg-teal-500" onClick={handleRating}>
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                            
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="Instructor">
                  <Card>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium text-lg">Instructor info</p>
                        <div
                          className="flex bg-blue-200 rounded-3"
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
                            className="w-48 h-48 m-2 rounded-full justify-center flex items-center overflow-hidden bg-gray-200"
                          >
                             {course?.instructorId.avatar.avatart_url
                              ?
                              <img
                              src={course?.instructorId.avatar.avatart_url}
                              alt="instructor image"
                            />
                              :
                              <i className="bi bi-person-circle text-5xl"></i>
                             }
                          
                          </div>

                          <Card className="m-2 w-[400px] bg-gray-50/50 backdrop-blur-sm">
                            <CardDescription className="m-4 space-y-2 overflow-hidden break-words">
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
                                <p className="">
                                  {instructorRatings.length} instructor Ratings
                                </p>
                              </div>
                            </CardDescription>
                          </Card>
                        </div>
                        <Dialog>
                          {instructorRatings.some(
                              (value) => value.userId.email == userEmail
                            ) ? (
                              ""
                            ) : (
                              <DialogTrigger onClick={()=>setStars(1)} className="underline mt-2 text-blue-600">
                                  Rate this instructor
                             
                              </DialogTrigger>
                            )}
                         
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                How whould you Rate this instructor?
                              </DialogTitle>
                              <DialogDescription>
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

                                              <Label
                                                className={
                                                  error.ratingError
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
                                              {error.ratingError ? (
                                                <span className="text-sm text-danger text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
                                                </span>
                                              ) : (
                                                <span className="text-sm text-muted-foreground">
                                                  Your message will be show to
                                                  the public.
                                                </span>
                                              )}
                              </DialogDescription>
                            </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                <Button type="button" className="bg-teal-400 hover:bg-teal-600" >
                                    cancell
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="button" className="bg-teal-400 hover:bg-teal-600" onClick={handleInstructorRating}>
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="w-[400px] mt-3">
          <div className="bg-white border border-danger rounded-4 ">
            <div className="m-3 space-y-2">
              <p className="font-bold">Course contents</p>

              {course &&
                course.sections.map((section, index) => (
                  <Accordion
                    key={index}
                    type="multiple"
                    className="w-full  border-1 border-teal-500 rounded-3 "
                  >
                    <AccordionItem value={`Section - ${index + 1}`}>
                      <AccordionTrigger className="text-base font-medium m-0 p-0 hover:no-underline ">
                        <p className="font-bold m-2">{section.sectionTitle}</p>
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
                          <div className="cursor-pointer">{lecture.title}</div>
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

export default PlayCourse;
