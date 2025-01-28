import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICourse } from "@/@types/courseType";
import FilterHeader from "@/Components/user/FilterHeader";
import { ICategory } from "@/@types/categoryTpe";
import { getCategoryies } from "@/Api/instructor";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";
import { addToCart, userCart, userPlans } from "@/Api/user";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { ICart } from "@/@types/cartType";
import { Pagination, Stack } from "@mui/material";
import { IUserSubscribe } from "@/@types/userSubscribe";


const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [cart, setCart] = useState<ICart>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const userId = useSelector((state: User) => state.id);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [plans, setPlans] = useState<IUserSubscribe[]>([]);

  useEffect(() => {
    const category = async () => {
      const data = await getCategoryies();
      if (data) {
        setCategories(data);
      }
      const plan = await userPlans(userId);
      
      if (plan.success) {
        setPlans(plan.plans);
      } 
      const cart = await userCart(userId);
      // console.log(cart,"carts")
      if (cart.success) {
        setCart(cart.cart);
      } 
    };
    category();
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
    const data = await addToCart(courseId, userId);

    if (data.success) {
      const cart = await userCart(userId);
      if (cart.success) {
        setCart(cart.cart);
        toast.success("Item Added to cart..");
      }
    } else {
      toast.error(data.response.data.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <div className="h-full flex justify-center items-center">
          <Card className="w-4/5 sm:w-1/2 h-[200px] flex justify-center items-center">
            <CardContent>
              <CardDescription>No courses available</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
      <Stack className="flex items-center justify-center mt-4" spacing={2}>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
      <Footer />
    </div>
  );
};

export default Courses;
