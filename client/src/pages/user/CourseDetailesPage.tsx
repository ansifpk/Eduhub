import { courseDetailes } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ICourse } from "@/@types/courseType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { allCourses } from "@/Api/instructor";
import { students } from "@/Api/admin";

interface Course {
  name: string;
  registered: number;
}

interface Review {
  name: string;
  comment: string;
  avatar: string;
}

const CourseDetailesPage = () => {

  const reviews: Review[] = [
    {
      name: "Lina",
      comment: "Very good class, cover every parts",
      avatar: "/api/placeholder/32/32",
    },
    {
      name: "John",
      comment: "Nice presentation",
      avatar: "/api/placeholder/32/32",
    },
    { name: "Rocky", comment: "Good work", avatar: "/api/placeholder/32/32" },
  ];
  const [course, setCourse] = useState<ICourse>();
  const [totellStudents, setStudents] = useState(0);
  const [totellCourses, setVideos] = useState(0);

  const { courseId } = useParams();
  useEffect(() => {
    const call = async () => {
      const res = await allCourses();
      if (res.success) {
        res.courses.map((value:ICourse)=>{
           if(value._id == courseId){
            setCourse(value);
           }
           if(value.instructorId._id==course?.instructorId._id){
            setVideos((prev)=>{
              return prev+1
            })
           }
          setStudents((_prev)=>{
           return _prev+value.students?.length!
          })
        })
      }
    };
    call();
  }, [courseId]);
console.log(totellStudents,totellCourses);
433249547444
  const handleOrder = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Q4gnKRv81OVLd0JhH7b5mQdxu167NGLbtFW9DlMYb4HSblpNEHgvUNRpBbss0eb3g6moVOOvbof2Tp9sNMXKSXL00nMMkFuq7"
      );
      const response = await fetch(
        "http://localhost:3002/user/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );
      const session = await response.json();

      if (session) {
        localStorage.setItem("bodyDatas", JSON.stringify(course));

        await stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="h-[390px] bg-black row w-full ">
        <div className="col-6 text-white flex flex-col justify-center px-5">
          <h1>Title : {course?.title}</h1>
          <br />
          <h6>About : {course?.description}</h6>
          <br />
          <p>created By : {course?.instructorId.name}</p>
          <p>created At : {course?.createdAt.slice(0, 10)}</p>
          <p className="font-sm">
            number of videos : {course?.sessions[0].lectures.length}{" "}
          </p>
          <h6>Price : RS: {course?.price} /-</h6>
        </div>
        <div className="col-6">
          <img src={course?.image.image_url} alt="" />
        </div>
      </div>
      <div className="row mt-4 flex justify-center">
        <div className="col-5">
          <div className="bg-white">
            <h2 className="ml-5">corse content</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full border border-black"
            >
              {course?.sessions.map((val, index) => (
                <AccordionItem key={index} value="item-1" className="mx-5">
                  <AccordionTrigger className="text-base font-bold hover:no-underline">
                    {index + 1} - {val.sessionTitle}
                  </AccordionTrigger>
                  {val.lectures.map((lecture, ind) => (
                    <AccordionContent
                      key={ind}
                      className="flex text-sm pt-3 border-t border-black items-center justify-between"
                    >
                      <div>{lecture.title} </div>
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
              <div>
                <h5 className="my-4 ml-5">Instructor</h5>
                <div className="mx-3 pb-5">
                  <Card>
                    <CardHeader>
                      <h2 className="text-lg font-semibold">{course?.instructorId.name}</h2>
                    </CardHeader>
                    <CardContent>
                     
                        <div
                          className="flex items-center gap-3 mb-4 last:mb-0"
                        >
                          <img
                            src={course?.instructorId.name}
                            alt={"review.name"}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="">no of courses {totellCourses}</div>
                            <div className="text-sm text-gray-500">
                              no of students {totellStudents}
                            </div>
                          </div>
                        </div>
                
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Reviews</h2>
            </CardHeader>
            <CardContent>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-4 last:mb-0"
                >
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-500">
                      {review.comment}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetailesPage;
