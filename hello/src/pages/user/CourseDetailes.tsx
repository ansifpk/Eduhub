import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
const CourseDetailes = () => {
  const [course, setCourse] = useState<ICourse>();
  const [instructor, setInstructor] = useState<IUserProfile>();
  const [star, setStar] = useState<number>(0);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const { doRequest, err } = useRequest();
  const { _id } = useParams();
  const userId = useSelector((state: IUser) => state._id);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const [cart, setCart] = useState<ICart>();
  const navigate = useNavigate();
  const ratingRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    doRequest({
      url: `${userRoutes.courseDeatiles}/${_id}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setCourse(data.course);
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
      url: `${userRoutes.plans}/${userId}`,
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

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);

  const handleEditRatings = (_id: string) => {
    doRequest({
      url: `${userRoutes.ratingCourse}/${_id}`,
      method: "patch",
      body: { review: ratingRef.current!.value, stars: star },
      onSuccess: () => {
        doRequest({
          url: `${userRoutes.ratingCourse}/${_id}`,
          method: "get",
          body: {},
          onSuccess: (data) => {
            setRatings(data.rating);
          },
        });
      },
    });
  };
  const handleCart = (courseId: string) => {
    doRequest({
      url: userRoutes.addToCart,
      method: "post",
      body: { courseId, userId },
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

  return (
    <>
      <Header />
      <div className=" container-fluid  grid grid-cols-2 mx-auto bg-gray-600 ">
        <div className="flex align-middle items-center justify-center">
          <img
            className="h-48 w-96 object-fill"
            src={course?.image.image_url}
          />
        </div>
        <div className="grid mx-2 text-white ">
          <strong className="font-bold text-3xl">{course?.title}</strong>
          <strong className="font-bold text-1xl">{course?.thumbnail}</strong>
          <p className="font-bold">created by {course?.instructorId.name}</p>
          <span className="text-xs">
            Last Updated {moment(course?.createdAt).calendar()}
          </span>{" "}
          <span className="text-xs">language english</span>
        </div>
      </div>
      <div className="flex justify-center gap-10  my-2">
        <div className="grid items-center justify-center text-center px-2 text-xs border-r-2">
          <p>4.7</p>
          <div>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
            <i className="bi bi-star-fill text-orange-300"></i>
          </div>
          <p>ratings</p>
        </div>
        <div className="">
          <div className="text-center text-xs">
            <i className="bi bi-person-vcard-fill"></i>
            <p>{course?.students.length}</p>
            <p>students</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-row gap-5">
        <div className="basis-2/3  border-4 p-4">
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
                  {course?.sections.sections.map((section, index) => (
                    <AccordionItem
                      key={section.sectionTitle + index}
                      value="item-1"
                    >
                      <AccordionTrigger className=" px-2 cursor-pointer">
                        <div className="flex justify-between w-full">
                          <span>Section {index + 1} </span>
                          <span>{section.sectionTitle} </span>
                        </div>
                      </AccordionTrigger>
                      {section.lectures.map((lecture, idx) => (
                        <AccordionContent
                          key={lecture.title + index + idx}
                          className="flex justify-between px-2"
                        >
                          <p>{lecture.title}</p>
                          <p>{lecture.duration}</p>
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
                {ratings.map((rating) => (
                  <div key={rating._id} className="border-2 space-y-2 p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={rating.userId.avatar.avatar_url}
                            alt="userImage"
                          />
                          <AvatarFallback>
                            {" "}
                            <i className="bi bi-person-circle"></i>
                          </AvatarFallback>
                        </Avatar>
                        <strong className="text-xs font-extralight ">
                          {rating.userId.name}
                        </strong>
                      </div>
                      {rating.userId._id == userId && (
                        <div className="flex gap-5">
                          <Dialog>
                            <form>
                              <DialogTrigger
                                onClick={() => setStar(rating.stars)}
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
                                        onMouseEnter={() => setStar(index + 1)}
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
                                  defaultValue={rating.review}
                                />

                                <DialogFooter>
                                  <DialogClose asChild>
                                    <button
                                      onClick={() =>
                                        handleEditRatings(rating._id)
                                      }
                                      className="bg-teal-500 hover:bg-teal-300 cursor-pointer  bottom-10  px-1 py-2 mb-2 mr-2 text-white text-xs rounded"
                                    >
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
                                  This action cannot be undone. This will
                                  permanently delete your Rating from our
                                  servers.
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
                      )}
                    </div>
                    <div className="flex items-center ">
                      <i className="bi bi-star-fill text-xs"></i>
                      <strong className="text-xs font-extralight ">{rating.stars}</strong>
                    </div>
                    <div className="text-xs font-extralight">
                      {rating.review}
                    </div>
                  </div>
                ))}
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
                    {/* <span className="font-extralight text-indigo-500 underline">
                      see more...
                    </span> */}
                    <div className="space-x-5">
                      <span className="font-light">students : 8</span>
                      <span className="font-light">courses : 8</span>
                      <span className="font-light">
                        Ratings : 4.7{" "}
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                        <i className="bi bi-star-fill text-orange-300 text-xs"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="basis-1/3  border-4 ">
          <img
            className="h-48 w-96 rounded object-fill"
            src={course?.image.image_url}
          />
          <div className="grid p-5 gap-3">
            <p>
              <span className="font-bold">{course?.price}/- </span>
              {/* <span className="text-xs">10%</span> */}
            </p>
            <button
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
              className="bg-teal-500 py-2 rounded text-white text-xs cursor-pointer font-semibold hover:bg-teal-300 hover:text-white"
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
            </button>
            <button className="bg-teal-500 py-2 rounded text-white text-xs font-semibold cursor-pointer hover:bg-teal-300 hover:text-white">
              Purchase
            </button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <article className="space-y-5">
              <h2 className="font-bold">Boost your conversion rate</h2>
              <p className="line-clamp-3 text-xs font-extralight">
                Get this course, plus 26,000+ of our top-rated courses, with
                Personal Plan.
              </p>
              <button
                className="bg-teal-500 w-full
                 py-2 rounded text-white text-xs font-semibold cursor-pointer hover:bg-teal-300 hover:text-white"
              >
                Purchase
              </button>
              <p className="text- text-xs font-extralight text-center">
                Cancel anytime
              </p>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetailes;
