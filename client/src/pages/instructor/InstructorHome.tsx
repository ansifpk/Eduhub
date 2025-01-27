import { IUser } from "@/@types/chatUser";
import { ICourse } from "@/@types/courseType";
import { IOrder } from "@/@types/orderTypes";
import { IRating } from "@/@types/ratingType";
import { User } from "@/@types/userType";
import { getCourses, getOrders, getRecentRatings, getTop5Courses, getTop5RatedCourses } from "@/Api/instructor";
import { logout } from "@/Api/user";
import  Chart  from "@/Components/instructor/Chart";
import InstructorAside from "@/Components/instructor/InstructorAside";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  Card,
  CardContent,
  
  CardHeader,
  
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { removeUser } from "@/redux/authSlice";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function InstructorHome() {

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
  const [orders,setOrders] = useState<IOrder[]>([])
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [topCourses, setTopCourses] = useState<ICourse[]>([]);
  const [ratings, setRatings] = useState<IRating[]>([]);
  const userId = useSelector((state: User) => state.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      const response = await getTop5Courses(userId);
      if(response.success){
        setCourses(response.courses)
      }else if(response.status == 403){
         await logout();
         dispatch(removeUser());
         toast.error('You are blocked by Admin');
         return navigate('/instructor/login');
      }else{
         return toast.error(response.response.data.message);
      }
      const data = await getTop5RatedCourses(userId);
      if (data.success) {
        setTopCourses(data.courses);
      }
      const res = await getRecentRatings(userId);
      if (res.success) {
        setRatings(res.ratings);
      }
     
    };

    fetching();
  }, []);
 

  return (
    
    <div className="bg-black ">
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 md:flex-row md:space-x-12 md:space-y-0 sm:flex-row sm:space-x-12 sm:space-y-0">
          <InstructorAside />
          <div className="grid grid-cols-2 w-full  gap-x-96 gap-y-4">
             <div className="w-[650px]">
                <Chart />
             </div>
             <div className=" text-white w-[250px]">
             <Card className='h-full'>
              <CardHeader>
                <h2 className="text-lg font-semibold">RECIENT REVIEWS</h2>
              </CardHeader>
              <CardContent>
                {
                  ratings.length>0?(
                    ratings.map((review, index) => (
                      <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                        <img 
                          src={review.userId.avatar.avatar_url?review.userId.avatar.avatar_url:"https://via.placeholder.com/50"} 
                          className="w-8 h-8 rounded-full"
                        />
                        <div className='flex justify-between items-center w-full' >
                          <div>
                          
                            <div className="font-medium text-xs">{review.userId.name}</div>
                         
                            <div>
                              <div className="text-xs ">
                                <div className="text-xs">
                               
                                  <Rating
                                    name="customized-10"
                                    defaultValue={1}
                                    max={1}
                                    size="small"
                                  />{" "}
                                  {review.stars} {labels[`${review.stars}`]}
                                </div>
                                {review.review}
                              </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ):(
                  <p>No Instructors Available</p>
                  )
                
                }
              </CardContent>
            </Card>
             </div>
             <div className="grid grid-cols-2 gap-x-80">
              <div className="w-[300px] h-[410px]">
                <Card className='h-full'>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">TOP 5 COURSES</h2>
                  </CardHeader>
                  <CardContent>
                    {
                    courses.length>0?(
                      courses.map((course, index) => (
                        <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                        <div >
                          <div className="font-medium text-sm">{course.title}</div>
                          <div className="text-xs text-gray-500">students : {course.students?.length}</div>
                        </div>
                        <div  className="font-medium text-xs">
                          Price {course.price}
                        </div>
                      </div>
                    ))
                    ):(
                      <p>No Courses Available</p>
                    )
                    }
                  </CardContent>
                </Card>
              </div>
              <div className="w-[300px] h-[410px]">
                <Card className='h-full'>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">TOP RATED 5 COURSES</h2>
                  </CardHeader>
                  <CardContent>
                    {
                    topCourses.length>0?(
                      topCourses.map((course, index) => (
                        <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                        <div >
                          <div className="font-medium text-sm">{course.title}</div>
                          <div className="text-xs text-gray-500">Reviews : {course.courseReviews?.length}</div>
                        </div>
                        <div  className="font-medium text-xs">
                          Price {course.price}
                        </div>
                      </div>
                    ))
                    ):(
                      <p>No Courses Available</p>
                    )
                    }
                  </CardContent>
                </Card>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
