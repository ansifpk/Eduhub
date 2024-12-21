import { ICourse } from "@/@types/courseType";
import { IRating } from "@/@types/ratingType";
import { User } from "@/@types/userType";
import { deleteInstructorRating, editInstructorRating, getInstructorRatings, getUserDetailes, instructorCourses } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { Rating } from "@mui/material";
import { CardBody, Card } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";
import {  Edit, Send, Star, StarIcon, Trash } from "lucide-react";
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
} from "@/Components/ui/alert-dialog";
import { Textarea } from "@/Components/ui/textarea";
import toast from "react-hot-toast";

const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [selected, setSelected] = useState("Courses");
  const [user, setUser] = useState<User>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [reviews,setReviews] = useState<IRating[]>([])
   const [value, setValue] = useState<number | null>(1);
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetching = async () => {
      const instructor = await getUserDetailes(instructorId!);
      if (instructor.success) {
        setUser(instructor.userData);
      }
      const data = await instructorCourses(instructorId!);
      if (data.success) {
        setCourses(data.courses);
      }
      const review = await getInstructorRatings(instructorId!)
      if(review.success){
        setReviews(review.ratings);
      }
    };
    fetching();
  }, []);
  console.log("//",reviews);
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
  
    function getLabelText(value: number) {
      return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
    }

    const handleEditRatings = async (ratingId: string) => {
  
      console.log("edit",ratingId);
      const response = await editInstructorRating(ratingId, review, stars);
     
      if (response.success) {

        const ratings = await getInstructorRatings(instructorId!)
        if (ratings.success) {
          setReviews(ratings.ratings);
          setValue(1);
          setStars(0!);
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
  console.log("delete",ratingId);
  
      const response = await deleteInstructorRating(ratingId);
  
      if(response.success){
       const ratings = await getInstructorRatings(instructorId!)
        if (ratings.success) {
         
          setReviews(ratings.rating);
          toast.success("Review deleted successfully..")
        } else {
          return toast.error(ratings.response.data.message);
        }
       
      }else{
        return toast.error(response.response.data.message)
      }
    };

  return (
    <div className="bg-blue-200">
      <Header />
      <div className="bg-white mx-5">
        <div >
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
            <div className="w-48 h-48 m-2 rounded-full  overflow-hidden bg-gray-200">
              <img
                src={
                  user?.avatar.avatar_url
                    ? user?.avatar.avatar_url
                    : "https://github.com/shadcn.png"
                }
                alt="instructor image"
              />
            </div>

            <Card className="m-2 w-[800px] bg-gray-50/50 backdrop-blur-sm">
              <CardBody className="m-4 space-y-2 overflow-hidden break-words">
                <div className="font-bold text-black">{user?.name}</div>
                {/* <div className="text-sm">{"im developer"}</div> */}
                <div className="font-bold text-black">{user?.email}</div>
                <div className="flex items-center">
                  <p className="text-sm font-medium">
                    <Rating readOnly max={1} />
                  </p>
                  <p className="">2 instructor Ratings</p>
                </div>
                <div className="flex items-center cursor-pointer text-primary">Message <Send className="h-4" /></div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>
          <div className="flex w-full flex-col ">
            <Tabs
              className="m-3"
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={(value) => setSelected(value.toString())}
            >
              <Tab key="Courses" title="Courses">
                <Card className="mx-3">
                  <CardBody>
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

                              <div className="space-y-1">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/users/courseDetailes/${course._id}`
                                    )
                                  }
                                  className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                                >
                                  view Details
                                </Button>
                              </div>
                            </div>
                          </div>
                      ))} 
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                   
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="reviews" title="Reviews">
                <Card className="mx-3">
                  <CardBody>
                    <ScrollArea className="w-full h-[350px]  rounded-md border">
                    <div className="m-3">
                  <h6>Reviews</h6>

                  <div className="grid gap-2 grid-cols-2 ">
                    {reviews?.length>0?(
                      reviews.map((val)=>(
                        <div className=" border">
                        <div className="m-3">
                        <div className="flex  justify-between items-center">
                          <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                val?.userId.avatar.avatar_url
                                ? val?.userId.avatar.avatar_url
                                : "https://github.com/shadcn.png"
                              }
                              alt="instrutcor profile"
                              />
                          </Avatar>
                          <p className="text-black font-medium">
                            {val.userId.name} 
                          </p>
                          </div>
                          <div>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Edit
                                        onClick={() => {
                                          setReview(val.review);
                                          setStars(val.stars);
                                          setValue(val.stars);

                                        }}
                                        className="h-3 m-1 cursor-pointer"
                                      />
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
                                                // setHover(newHover);
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
                                      <Trash className="h-3 m-1 cursor-pointer" />
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
                        <p className="text-black font-medium text-xs"> {val.updatedAt.slice(0,10)}</p>
                        </div>
                       
                      </div>
                      ))
                    ):(
                      <div className=" border">
                      <div className="m-3">
                       
                        no reviwes 
                    </div>
                    </div>
                    )}    
                  </div>
                   </div>
                     
                    </ScrollArea>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorProfile;