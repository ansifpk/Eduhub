import { useEffect, useState } from "react";
import { ICourse } from "../../@types/courseType";
import { useSelector } from "react-redux";
import { User } from "../../@types/userType";
import { ICategory } from "../../@types/categoryTpe";
import { ICart } from "../../@types/cartType";
import { useNavigate } from "react-router";
import { addToCart, userCart, userPlans } from "../../Api/user";
import toast from "react-hot-toast";
import Header from "../../components/Header/Header";
import FilterHeader from "../../components/user/FilterHeader";
import { getCategoryies } from "../../Api/instructor";
import { IUserSubscribe } from "../../@types/userSubscribe";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription } from "../../components/ui/card";
import Footer from "../../components/Footer/Footer";
import useRequest from "../../hooks/useRequest";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";
import userRoutes from "../../service/endPoints/userEndPoints";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";


const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [cart, setCart] = useState<ICart>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const userId = useSelector((state: User) => state.id);
   const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);
  const {doRequest,errors} = useRequest()
  useEffect(() => {
    doRequest({
      url:instructorRoutes.getCategoryies,
      method:"get",
      body:{},
      onSuccess:(data)=>{
        setCategories(data);
      }
    })
    doRequest({
      url:`${userRoutes.plans}/${userId}`,
      method:"get",
      body:{},
      onSuccess:(data)=>{
        setPlans(data.plans);
      }
    })
    doRequest({
      url:`${userRoutes.Cart}/${userId}`,
      method:"get",
      body:{},
      onSuccess:(data)=>{
        setCart(data.cart);
      }
    })
  }, []);

  const navigate = useNavigate();

  const handleCoursesfromChild = (courses: ICourse[]) => {
    setCourses(courses);
  };
  const handlepagesfromChild = (pages: number) => {
    setTotalPage(pages);
  };

  const handleHart = async (courseId: string) => {
    if(!userId){
      return navigate("/users/login");
    }
    doRequest({
      url:userRoutes.addToCart,
      method:"post",
      body:{courseId,userId},
      onSuccess:()=>{
        doRequest({
          url:`${userRoutes.Cart}/${userId}`,
          method:"get",
          body:{},
          onSuccess:(data)=>{
            setCart(data.cart);
            toast.success("Item Added to cart..");
          }
        })
      }
    })
  };

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  return (
    <div>
      <Header />
      <FilterHeader
        onsendcourse={handleCoursesfromChild}
        onsendpages={handlepagesfromChild}
        categories={categories}
        page={page}
      />
      {courses.length > 0 ? (
        <div className="relative flex justify-center">
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
                        navigate(`/users/courseDetailes/${course._id}`)
                      }
                      className="bg-[#49BBBD] text-sm w-full text-white hover:bg-[#49BBBD]"
                    >
                      View Details
                    </Button>
                    {course.students?.some((value) => value._id === userId) ? (
                      <Button
                        type="button"
                        onClick={() =>
                          navigate(`/user/playCourse/${course._id}`)
                        }
                        className="bg-[#49BBBD] text-sm w-full text-white hover:bg-[#49BBBD]"
                      >
                        Go to Class
                      </Button>
                    ) : plans.some(
                        (subs) =>
                          subs.subscriptionId.instructorId ===
                          course.instructorId._id
                      ) ? (
                      <Button
                        type="button"
                        onClick={() =>
                          navigate(`/user/playCourse/${course._id}`)
                        }
                        className="bg-[#49BBBD] text-sm w-full text-white hover:bg-[#49BBBD]"
                      >
                        Go to Class
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() =>
                          cart?.courses?.some(
                            (value) => value._id === course._id
                          )
                            ? navigate("/users/cart")
                            : handleHart(course._id)
                        }
                        className="bg-[#49BBBD] text-sm w-full text-white hover:bg-[#49BBBD]"
                      >
                        {cart?.courses?.some(
                          (value) => value._id === course._id
                        )
                          ? "Go to Cart"
                          : "Add to Cart"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center ">
          <Card className="w-4/5 sm:w-1/2 h-[200px] flex justify-center items-center">
            <CardContent>
              <CardDescription>No courses available</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
     <div className="my-5">
              <Pagination>
                <PaginationContent className="gap-5">
                  <PaginationItem>
                    <PaginationPrevious  onClick={() => {
                      if (page > 1) {
                        setPage((prev) => prev -= 1);
                      }
                    } } className={`text-black ${page > 1 ? "cursor-pointer" : ""} `} size={undefined} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink size={undefined} className="text-black"  isActive>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext size={undefined}  onClick={()=>{
                       if(page !==totalPage){
                        setPage((prev)=>prev+=1)
                      }
                      }} className={`text-black ${page<totalPage?"cursor-pointer":""}`} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              </div>
      <Footer />
    </div>
  );
};

export default Courses;
