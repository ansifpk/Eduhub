import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { addToCart, removeFromcart, stripePurchase, userCart } from "@/Api/user";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { ICart } from "@/@types/cartType";
import { ICourse } from "@/@types/courseType";
import { useNavigate } from "react-router-dom";
import {  X } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/Components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
const Cart = () => {

  const [cart, setCart] = useState<ICart>();
  const [subTotal, setSubTotal] = useState(0);
  const userId = useSelector((state: User) => state.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      const data = await userCart(userId);
      if(data.success){
    
        const courses = data.cart.courses;
        if(courses){
          courses.map((value:ICourse)=>{
            setSubTotal((prev)=>prev+=value.price)
          })
        }
        setCart(data.cart);
      }
    };
    fetching();
   
    
  }, []);

  const handleCart = async (courseId:string) => {

        const data = await removeFromcart(courseId,userId);
        if(data.success){
            console.log(data.cart);
            setCart(data.cart)
            setSubTotal(0)
           data.cart.courses.map((value:ICourse)=>{
            setSubTotal((prev)=>prev+=value.price)
          })
           return toast.success("item removed from your cart")
        }else{
          return toast.error(data.response.data.message)
        }
  }
const handleOrder = async (course:any) => {
  try {
      console.log(course);
      
          const stripe = await loadStripe(
            "pk_test_51Q4gnKRv81OVLd0JhH7b5mQdxu167NGLbtFW9DlMYb4HSblpNEHgvUNRpBbss0eb3g6moVOOvbof2Tp9sNMXKSXL00nMMkFuq7"
          );
          const data = await stripePurchase(course!);
          if (data) {
            localStorage.setItem("bodyDatas", JSON.stringify(course));
  
            await stripe?.redirectToCheckout({
              sessionId: data.id,
            });
          }
      
      } catch (error) {
        console.error(error);
      }
}
  return (
    <div>
      <Header />
      <div className="flex justify-center gap-5 mt-5">
        {cart?.courses?.length! > 0 ? (
          <div className="flex justify-center gap-5">
            <div>
            {cart?.courses?.map((value, index) => (
             <div className="flex" key={index}>
                  <div
                className="w-[500px] h-[170px] bg-blue-50  rounded-2 border shadow-lg m-2"
                key={index}
              >
                <div className="flex">
                  <div className="flex w-[400px] overflow-hidden h-[130px]  ">
                    <img
                      src={value.image.image_url}
                      width={"200px"}
                      height={"150px"}
                      alt={value.title}
                      className="h-[120px]  w-[200px]  object-fill border m-1 rounded-2"
                    />
                    <div className="flex justify-center items-center">
                      <div>
                        <p className="font-medium text-xs text-muted-foreground">
                          Category: {value.category} <br />
                          <br />
                          Topic: {value.subCategory} <br />
                          <br /> instructor: {value.instructorId.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-5 m-1">
                   <div className="">
                    <p>Price</p>
                      <p className="font-medium text-xs text-muted-foreground">
                        RS : {value.price} 
                      </p>
                   </div>
                    <X className="cursor-pointer" onClick={()=>handleCart(value._id)}/>
                  </div>
                </div>
               
                <p className="text-black">{value.title}</p>
              
              
              </div>
              <div className="w-[300px]  h-[240px] bg-green-50  rounded-2 border shadow-lg m-2">
              <div className="m-2">
                <p className="font-medium text-s text-muted-foreground">
                  Sub totall : {value.price}
                </p>
                <Separator className="my-1" />
                <p className="font-medium text-s text-muted-foreground">
                  Coupoun Descount
                </p>
                <Separator className="my-1" />
                <p className="font-medium ">Totall : {value.price}</p>
                 <div className="flex my-2">
                  <Input type="text" className="" placeholder="enter cupon code" /> <Button>apply</Button>
                 </div>
                <Button
                  type="button"
                  className="w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]"
                  onClick={()=>handleOrder(value)}
                >
                  purchase
                </Button>
              </div>
            </div>
             </div>
            ))}
            </div>
           
          
          </div>
        ) : (
          <>
            <div className="w-[500px] h-[170px] bg-blue-50  rounded-2 border shadow-lg">
              <div className="w-[500px] h-[170px] flex flex-col justify-content-center align-items-center">
                <h6>Your Cart is Empty</h6>
                <Button
                  className="bg-[#49BBBD] text-sm   text-white hover:bg-[#49BBBD]"
                  onClick={() => navigate("/users/courses")}
                >
                  Courses
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
