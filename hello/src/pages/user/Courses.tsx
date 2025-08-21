import type { ICart } from "@/@types/cartType";
import type { ICourse } from "@/@types/courseType";
import type { IUserSubscribe } from "@/@types/userSubscribe";
import type { IUser } from "@/@types/userType";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FilterHeader from "@/components/user/FilterHeader";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCurses] = useState<ICourse[]>([]);
  const [cart, setCart] = useState<ICart>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const userId = useSelector((state:IUser)=>state._id);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const navigate = useNavigate();
  const {doRequest,err} = useRequest();
  
  const handleCourse = useCallback(
    (courses: ICourse[]) => {
      setCurses(courses);
    },
    [setCurses]
  );
  const handlePage = useCallback(
    (page: number) => {
      setTotalPage(page);
    },
    [setTotalPage, setPage]
  );

  useEffect(()=>{
     if(userId){
       doRequest({
            url:`${userRoutes.Cart}/${userId}`,
            method:"get",
            body:{},
            onSuccess:(data)=>{
              setCart(data.cart);
            }
      });
  
      doRequest({
        url:`${userRoutes.plans}/${userId}`,
        method:"get",
        body:{},
        onSuccess:(data)=>{
          setPlans(data.plans);
        }
      })
     }

  },[userId]);

  const handleCart = (courseId:string) =>{
     doRequest({
      url:`${userRoutes.addToCart}?courseId=${courseId}`,
      method:"post",
      body:{userId},
      onSuccess:()=>{ 
        doRequest({
          url:`${userRoutes.Cart}/${userId}`,
          method:"get",
          body:{},
          onSuccess:(data)=>{
            setCart(data.cart);
            toast.success("Item Added to cart");
          }
        })
      }
    })
  }

  useEffect(()=>{
      err?.map((err)=>toast.error(err.message))
  },[err]);
 
  return (
    <>
      <Header />
      <FilterHeader handleCourse={handleCourse} handlePage={handlePage} page={page} />
      <div className="container  mx-auto ">
        {courses.length > 0 ? (
          <>
            <div className="relative flex justify-center my-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-4 mx-1 md:mx-5 lg:mx-5 mt-4">
                {courses.map((course) => (
                  <div
                    className="w-full border shadow-lg overflow-hidden"
                    key={course._id}
                  >
                    <div className="overflow-hidden border rounded-md m-1">
                      <img
                        src={course.image.image_url}
                        alt={course.title}
                        className="h-[150px] w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <div className="text-sm m-2 space-y-2">
                      <h6 className="font-medium leading-tight line-clamp-2">
                        {course.title}
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        Created: {course.instructorId.name} <br />
                        Category: {course.category} <br />
                        Topic: {course.subCategory} <br />
                        Price: {course.price}
                      </p>
                      <div className="space-y-1">
                        <Button
                          type="button"
                            onClick={() =>
                              navigate(`/user/courseDetailes/${course._id}`)
                            }
                          className="bg-teal-500 cursor-pointer text-sm w-full text-white hover:bg-teal-300 "
                        >
                          View Details
                        </Button>
                        <Button
                          type="button"
                          onClick={()=>course.students.some((student)=>student._id == userId) || plans.some((sub)=>sub.subscriptionId.instructorId._id == course.instructorId._id)? navigate(`/user/playCourse/${course._id}`):cart?.courses.some((cour)=>cour._id == course._id )?navigate('/user/cart'):handleCart(course._id)}
                          className="bg-teal-500 cursor-pointer  text-sm w-full text-white hover:bg-teal-300"
                          >
                          {course.students.some((student)=>student._id == userId) || plans.some((sub)=>sub.subscriptionId.instructorId._id == course.instructorId._id)?"Go To Class":cart?.courses.some((cour)=>cour._id == course._id )?"Go To Cart":"Add To Cart"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className=" flex justify-center items-center ">
            <Card className="w-4/5 sm:w-1/2 h-[200px] flex justify-center items-center">
              <CardContent>
                <CardDescription>No courses available</CardDescription>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* pagination */}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => setPage((prev) => (prev !== 1 ? prev - 1 : prev))}
            />
          </PaginationItem>
          {Array.from({ length: totalPage }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                className={page == i + 1 ? "bg-teal-500 text-white" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
             className="cursor-pointer"
              onClick={() =>
                setPage((prev) => (prev !== totalPage ? prev + 1 : prev))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Footer />
    </>
  );
};

export default React.memo(Courses);
