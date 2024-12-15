import { courseDetailes, stripePurchase } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

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
import { allCourses } from "@/Api/instructor";
import std from '../../assets/home-page/studnet.jpg'
import schoole from '../../assets/home-page/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min 1.png'
import tec from '../../assets/home-page/teacher-home.jpg'
import sss from '../../assets/home-page/9906021.jpg'
import dd from '../../assets/home-page/3099563.jpg'
import { students } from "@/Api/admin";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";



const CourseDetailesPage = () => {
  const [course, setCourse] = useState<ICourse>();
  const [totellStudents, setStudents] = useState(0);
  const [option, setOption] = useState(true);
  const [totellCourses, setTotellCourses] = useState(0);
  const [totalVideos, setTotellVideos] = useState(0);
  const [paymentMethord, setPaymentMethord] = useState("Wallet");
  const { courseId } = useParams();
  const userId = useSelector((state:User)=>state.id)
  const navigate = useNavigate()

  useEffect(() => {
    const call = async () => {
      const data = await courseDetailes(courseId!);
      if (data.success) {
        setCourse(data.course)
      }
    };
    call();
  }, []);

  const handleOrder = async () => {
    try {
      if(paymentMethord == "Wallet"){
        console.log("wallet");
      }else{
        const stripe = await loadStripe(
        "pk_test_51Q4gnKRv81OVLd0JhH7b5mQdxu167NGLbtFW9DlMYb4HSblpNEHgvUNRpBbss0eb3g6moVOOvbof2Tp9sNMXKSXL00nMMkFuq7"
      );
      const data = await stripePurchase(course!)
      if (data) {
        localStorage.setItem("bodyDatas", JSON.stringify(course));
        console.log("hi im here");
        
        await stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      }
        
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="">
        <img src={tec} style={{width:"100%",height:"200px", objectFit: "contain"}} alt="image" />
        {/* <div className="col-12 h-auto w-full text-white flex flex-col " style={{backgroundImage:`url(${schoole})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",width:"100%",}} >
          <h3>title : {course?.title}nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</h3>
          <h3>About : {course?.thumbnail}</h3><br />
          <h6>Category : {course?.category}</h6>
          <p>Level : {course?.level}</p>
          <p>created By : {course?.instructorId.name}</p>
          <p>created At : {course?.createdAt.slice(0, 10)}</p>
          <p className="font-sm">number of videos : {totalVideos} </p>
          <p className="font-sm">number of students : {totellStudents} </p>
          <h6>Price : RS: {course?.price} /-</h6>
          
        </div> */}
        {/* <div className="col-4  overflow-hidden ">
          <img
            width={150}
            height={150}
            className="h-[250px]  object-cover  shadow-sm "
            // src={course?.image.image_url}
            src={schoole}
            alt="cour image"
          />
        </div> */}
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
              {course?.sections.map((val, index) => (
                <AccordionItem key={index} value={`${index}`} className="mx-5">
                  <AccordionTrigger  className="text-base font-bold hover:no-underline">
                    Section {index + 1} - {val.sectionTitle}
                  </AccordionTrigger>
                  {val.lectures.map((lecture, ind) => (
                    <AccordionContent
                      key={ind}
                      className="flex text-sm pt-3 border-t border-black items-center justify-between"
                    >
                      <div>
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
              <div>
                <h5 className="my-4 ml-5">Instructor</h5>
                <div className="mx-3 pb-5">
                  <Card>
                    <CardHeader>
                      <h2 className="text-lg font-semibold">
                        {course?.instructorId.name}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4 last:mb-0">
                        <img
                          src={
                            course?.instructorId.avatar.avatart_url
                              ? course?.instructorId.avatar.avatart_url
                              : "https://github.com/shadcn.png"
                          }
                          alt={"review.name"}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div>no of courses {totellCourses}</div>
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
              <h2 className="text-lg font-semibold">Purchase the course</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col  gap-3 mb-4 last:mb-0">
                <img
                  src={course?.image.image_url}
                  alt={"review.name"}
               
                  className="w-auto h-auto"
                />
                <RadioGroup onValueChange={(value)=>{
                  setPaymentMethord(value)
                  setOption(false)
                }} defaultValue={paymentMethord}>
                  <h6>Choose a payment option</h6>
                
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Stripe" id="option-two" />
                    <Label htmlFor="Stripe">Stripe</Label>
                  </div>
                </RadioGroup>
                <div>
                  {
                      course?.students?.some((value)=>value._id == userId)?<Button  type="button" onClick={()=>navigate(`/user/playCourse/${course._id}`)} className="w-full">View</Button>
                      :
                      <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button disabled={option} type="button" className="w-full">purchase</Button>
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
                  }
                 
                </div>
               
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
