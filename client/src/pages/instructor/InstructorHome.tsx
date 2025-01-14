import { ICourse } from "@/@types/courseType";
import { IOrder } from "@/@types/orderTypes";
import { User } from "@/@types/userType";
import { getCourses, getOrders } from "@/Api/instructor";
import InstructorAside from "@/Components/instructor/InstructorAside";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export default function InstructorHome() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const userId = useSelector((state: User) => state.id);
  useEffect(() => {
    const fetching = async () => {
      const response = await getOrders(userId);
      if (response.success) {
        setOrders(response.orders);
      } else {
        return toast.error(response.response.data.message);
      }
      const data = await getCourses(userId);
      if (data.success) {
        setCourses(data.courses);
      }
    };

    fetching();
  }, []);
  console.log(orders);
  console.log("courses", courses);

  return (
    <div className="bg-black">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <InstructorAside />

          <div className="flex-1 lg:max-w-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-gray-950 text-white h-[500px]">
                <CardHeader>
                  <CardTitle>Top 5 courses</CardTitle>
                  <CardDescription>
                    This is your top 5 courses this far
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {courses.length>0?(
                       courses.map((course:ICourse,index)=>(
                        <div key={index} className="flex items-center">
                        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                        <AvatarImage src={course.image.image_url} alt="Avatar" />
                        </Avatar>
                        <div className="ml-4 ">
                          <p className="text-sm text-white text-muted-foreground">
                           {course.title}
                          </p>
                          <p className="text-sm text-white text-muted-foreground">
                           studnets : {course.students?.length}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">RS:{course.price}</div>
                      </div>
                       ))
                    ):(
                    <p>No courses Uploaded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-gray-950 text-white">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {orders.length > 0 ? (
                      orders.map((order: IOrder, index) => (
                        <div className="flex items-center" key={index}>
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={order.user.avatar.avatar_url?order.user.avatar.avatar_url:"https://github.com/shadcn.png"} alt="Avatar" />
                           
                          </Avatar>

                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {order.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground ">
                              {order.user.email}
                            </p>
                          </div>
                          <div className="ml-auto font-medium text-sm">RS : {order.course.price}</div>
                        </div>
                      ))
                    ) : (
                      <p>no orders made</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
