import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import Header from "../../Components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Footer from "@/Components/Footer/Footer";
import {
  courseDetailes,
  deleteRating,
  editRating,
  getInstructorRatings,
  getRatings,
  instructorRating,
  ratingCourse,
} from "@/Api/user";
import toast from "react-hot-toast";
import { ICourse } from "@/@types/courseType";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@/Components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Box, Rating, Tab, Tabs } from "@mui/material";
import { Separator } from "@/Components/ui/separator";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardDescription } from "@/Components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
  Delete,
  DeleteIcon,
  Edit,
  MoreHorizontal,
  StarIcon,
  Trash,
} from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { IRating } from "@/@types/ratingType";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { IInstructorRating } from "@/@types/instructorRatingType";
import moment from "moment";

const PlayCourse: React.FC = () => {
  const [course, setCourse] = useState<ICourse>();
  const [chapter, setChapter] = useState("");
  const [hover, setHover] = React.useState(-1);
  const [expant, setExpant] = useState(false);
  const [navbar, setNavbar] = React.useState("one");
  const [value, setValue] = React.useState<number | null>(1);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [instructorRatings, setInstructorRatings] = useState<
    IInstructorRating[]
  >([]);
  const [errors, setErrors] = useState({
    ratingError: true,
  });

  const userId = useSelector((state: User) => state.id);
  const userEmail = useSelector((state: User) => state.email);

  const { courseId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const course = async () => {
      const course = await courseDetailes(courseId!);

      if (course.success) {
        setCourse(course.course);

        setChapter(course.course.sections[0].lectures[0].content.video_url);
        const instructorRatings = await getInstructorRatings(
          course.course.instructorId._id
        );

        if (instructorRatings.success) {
          setInstructorRatings(instructorRatings.ratings);
        } else {
          return toast.error(instructorRatings.response.data.message);
        }
      } else {
        return toast.error(course.response.data.message);
      }
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
      } else {
        return toast.error(ratings.response.data.message);
      }
    };
    course();
  }, [courseId]);

  const handleChange = (event: React.SyntheticEvent, navbar: string) => {
    setNavbar(navbar);
  };
  console.log("test",course);

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

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleRating = async () => {
    const data = await ratingCourse(review, stars, course?._id!, userId);

    if (data.success) {
      setValue(1);
      setStars(0!);
      setExpant(false);
      setReview("");
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
      } else {
        return toast.error(ratings.response.data.message);
      }
    } else {
      toast.error(data.response.data.message);
    }
  };

  const handleEditRatings = async (ratingId: string) => {
    const response = await editRating(ratingId, review, stars);

    if (response.success) {
      const ratings = await getRatings(courseId!);
      if (ratings.success) {
        setRatings(ratings.rating);
        setValue(1);
        setStars(0!);
        setExpant(false);
        setReview("");
        return toast.success("Review edit successfully..");
      } else {
        return toast.error(ratings.response.data.message);
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
      } else {
        return toast.error(ratings.response.data.message);
      }
    } else {
      return toast.error(response.response.data.message);
    }
  };

  const handleInstructorRating = async () => {
    const response = await instructorRating(
      course?.instructorId._id!,
      userId,
      review,
      stars
    );

    if (response.success) {
      const instructorRatings = await getInstructorRatings(
        course?.instructorId?._id!
      );

      if (instructorRatings.success) {
        setInstructorRatings(instructorRatings.ratings);
        return toast.success("instrutcor rated succesfuly...");
      } else {
        return toast.error(instructorRatings.response.data.message);
      }
    } else {
      return toast.error(response.response.data.message);
    }
  };

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
              <KeyboardBackspaceIcon />
            </Button>
            <div className=" bg-white border rounded-4 w-full ">
              <div className="flex flex-col p-3">
                <h6 className="text-s">{course?.title}</h6>
                <p className="font-medium text-xs text-muted-foreground">
                  {course?.sections.length} contents
                </p>
              </div>
            </div>
          </div>
          <div className="m-2">
            <ImageList
              sx={{ width: 640, height: 360 }}
              cols={1}
              rowHeight={164}
            >
              <ImageListItem>
                <video
                  src={`${chapter}`}
                  autoPlay={true}
                  controls
                  muted={false}
                  controlsList="nodownload"
                />
              </ImageListItem>
            </ImageList>
            <div className="m-2">
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={navbar}
                  onChange={handleChange}
                  textColor="inherit"
                  aria-label="secondary tabs example"
                >
                  <Tab value="one" label="Description" />
                  <Tab value="two" label="Reviews & ratings" />
                  <Tab value="three" label="Instructor" />
                </Tabs>
                <Separator className="bg-gray-400" />
              </Box>
              <div>
                {navbar == "one" ? (
                  <div className="p-2">
                    <p className="font-bold"> Title : {course?.thumbnail}</p>
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
                      {/* <div>
                        {}
                      </div> */}
                      <div>
                        {/* {course?.test &&
                        // !course.test.students.includes(userId) ? (
                        course?.test?.students.some(
                          (value) => value.user !== userId
                        ) ? (
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
                        ) : (
                          <div className="flex flex-col w-25 h-[200px] gap-2">
                            <div className="border rounded-2 shadow-lg w-full h-[150px]">
                              <h4 className="font-medium text-sm ">
                                Your Score
                              </h4>
                            </div>
                            <Button
                              disabled
                              className="text-black  shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                            >
                              Test Attended
                            </Button>
                          </div>
                        )
                        } */}
                        {course?.test?course.test.students.some((val)=>val.user==userId)?
                        (
                          <div className="flex flex-col w-25 h-[200px] gap-2">
                            <div className="border rounded-2 shadow-lg w-full h-[150px]">
                              <h4 className="font-medium text-sm ">
                                Your Score
                              </h4>
                              <div className="flex h-full w-full items-center justify-center">
                               <h1 >{course.test.students.find((val)=>val.user==userId)?.score}</h1>
                              </div>
                            </div>
                            <Button
                              disabled
                              className="text-black  shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                            >
                              Test Attended
                            </Button>
                          </div>
                        ):(
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
                        ):
                        "illa"}
                      </div>
                    </div>
                  </div>
                ) : navbar == "two" ? (
                  <div>
                    <h6 className="my-3">Reviews & Ratings</h6>
                    <div className="grid gap-2 grid-cols-2">
                      {ratings.length > 0 ? (
                        ratings.map((val: IRating, index) => (
                          <div className="border" key={index}>
                            <div className="m-3">
                              <div className="flex items-center justify-between">
                                <div className="flex  gap-3 items-center">
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        val.userId.avatar.avatar_url
                                          ? val.userId.avatar.avatar_url
                                          : "https://github.com/shadcn.png"
                                      }
                                      alt="user profile"
                                    />
                                  </Avatar>
                                  <p className="text-black font-medium">
                                    {val.userId.name}
                                  </p>
                                </div>
                                <div>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      {val.userId._id == userId && (
                                        <Edit
                                          onClick={() => {
                                            setReview(val.review);
                                            setStars(val.stars);
                                            setValue(val.stars);
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
                                              value={value}
                                              precision={0.5}
                                              getLabelText={getLabelText}
                                              onChange={(event, newValue) => {
                                                setValue(newValue);
                                                setStars(newValue!);

                                                // handleRating(newValue!)
                                              }}
                                              onChangeActive={(
                                                event,
                                                newHover
                                              ) => {
                                                setHover(newHover);
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
                                                  setReview(e.target.value);
                                                }
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
                                  {" "}
                                  <Rating
                                    name="customized-10"
                                    defaultValue={1}
                                    max={1}
                                    size="small"
                                  />{" "}
                                  {val.stars} {labels[`${val.stars}`]}
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
                            <Button className="underline" variant="link">
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
                                                ? course?.instructorId.avatar
                                                    .avatart_url
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
                        <DialogTrigger>
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
                              <div className="space-y-3">
                                {value !== null && (
                                  <Box sx={{ ml: 2, font: "caption" }}>
                                    {labels[hover !== -1 ? hover : value]}
                                  </Box>
                                )}
                                <Rating
                                  className="mx-5"
                                  name="hover-feedback"
                                  value={value}
                                  precision={0.5}
                                  getLabelText={getLabelText}
                                  onChange={(event, newValue) => {
                                    setValue(newValue);
                                    setStars(newValue!);
                                    setExpant(true);
                                    // handleRating(newValue!)
                                  }}
                                  onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                  }}
                                  emptyIcon={
                                    <StarIcon
                                      style={{ opacity: 0.55 }}
                                      fontSize="inherit"
                                    />
                                  }
                                />
                                {expant && (
                                  <div>
                                    <div className="grid w-full gap-1.5">
                                      <Label
                                        htmlFor="message-2"
                                        className={
                                          errors.ratingError
                                            ? "text-danger"
                                            : "text-black"
                                        }
                                      >
                                        Your Message
                                      </Label>
                                      <Textarea
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
                                            setReview(e.target.value);
                                          }
                                        }}
                                        className="text-black"
                                        placeholder=" Please share your personal expierience after taking this course."
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
                                    <DialogClose asChild>
                                      <Button
                                        type="button"
                                        disabled={
                                          errors.ratingError ? true : false
                                        }
                                        onClick={handleRating}
                                      >
                                        submit
                                      </Button>
                                    </DialogClose>
                                  </div>
                                )}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ) : (
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
                              <Rating readOnly max={1} />
                            </p>
                            <p className="">
                              {instructorRatings.length} instructor Ratings
                            </p>
                          </div>
                        </CardDescription>
                      </Card>
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        {instructorRatings.some(
                          (value) => value.userId.email == userEmail
                        ) ? (
                          ""
                        ) : (
                          <Button className="underline" variant="link">
                            Rate this instructor
                          </Button>
                        )}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            How whould you Rate this instructor?
                          </DialogTitle>
                          <DialogDescription>
                            <div className="space-y-3">
                              {value !== null && (
                                <Box sx={{ ml: 2, font: "caption" }}>
                                  {labels[hover !== -1 ? hover : value]}
                                </Box>
                              )}
                              <Rating
                                className="mx-5"
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                  setStars(newValue!);
                                  // setExpant(true);
                                  // handleRating(newValue!)
                                }}
                                onChangeActive={(event, newHover) => {
                                  setHover(newHover);
                                }}
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />

                              <div>
                                <div className="grid w-full gap-1.5">
                                  <Label
                                    htmlFor="message-2"
                                    className={
                                      errors.ratingError
                                        ? "text-danger"
                                        : "text-black"
                                    }
                                  >
                                    Your Message
                                  </Label>
                                  <Textarea
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
                                        setReview(e.target.value);
                                      }
                                    }}
                                    className="text-black"
                                    placeholder=" Please share your personal expierience after taking this course."
                                    id="message-2"
                                  />
                                  {errors.ratingError ? (
                                    <p className="text-sm text-danger text-muted-foreground">
                                      Your message will be show to the public.
                                    </p>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">
                                      Your message will be show to the public.
                                    </p>
                                  )}
                                </div>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    disabled={errors.ratingError ? true : false}
                                    onClick={handleInstructorRating}
                                  >
                                    submit
                                  </Button>
                                </DialogClose>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[400px] mt-3">
          <div className=" bg-white border border-danger rounded-4 ">
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
                          onClick={() => setChapter(lecture.content.video_url)}
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
