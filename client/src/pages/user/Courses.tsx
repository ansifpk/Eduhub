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
import { addToCart, userCart } from "@/Api/user";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { ICart } from "@/@types/cartType";

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [cart, setCart] = useState<ICart>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const userId = useSelector((state: User) => state.id);

  useEffect(() => {
    const category = async () => {
      const data = await getCategoryies();
      if (data) {
        setCategories(data);
      }
      const cart = await userCart(userId);
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

  const handleHart = async (courseId: string) => {
    const data = await addToCart(courseId, userId);
    if (data.success) {
      setCart(data.cart);
      toast.success("Item Added to cart..");
    } else {
      toast.error(data.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <FilterHeader
        onsendcourse={handleCoursesfromChild}
        categories={categories}
      />
      {courses.length > 0 ? (
        <div className="relative flex justify-content-center ">
          <div className="flex flex-wrap mx-5 mt-4 gap-3 m-auto  ">
            {courses.map((course) => (
              <div
                className={"w-[250px]  border shadow-lg overflow-hidden "}
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
                      {course.title}
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
                        navigate(`/users/courseDetailes/${course._id}`)
                      }
                      className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                    >
                      view Details
                    </Button>
                    {course.students?.some((value) => value._id == userId) ? (
                      <Button
                        type="button"
                        onClick={() => navigate(`/user/playCourse/${course._id}`)}
                        className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                      >
                        Go to class
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() =>
                          cart?.courses?.some(
                            (value) => value._id == course._id
                          )
                            ? navigate("/users/cart")
                            : handleHart(course._id)
                        }
                        className="bg-[#49BBBD] text-sm  w-full text-white hover:bg-[#49BBBD]"
                      >
                        {cart?.courses?.some((value) => value._id == course._id)
                          ? "Go to cart"
                          : "Add to cart"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className=" h-full flex justify-center items-center">
            <Card className="w-1/2 h-[200px] d-flex justify-center items-center">
              <CardContent className="d-flex items-center">
                <CardDescription>No courses available</CardDescription>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Courses;
