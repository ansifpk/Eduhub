import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { couponDetailes, logout, removeFromcart, stripePurchase, userCart } from "@/Api/user";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { ICart } from "@/@types/cartType";
import { ICourse } from "@/@types/courseType";
import { useNavigate } from "react-router-dom";
import {  X } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/Components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { removeUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";


const Cart = () => {

  const [cart, setCart] = useState<ICart>();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const userId = useSelector((state: User) => state.id);
  const  [couponCode,setCouponCode] = useState("")
  const  [discount,SetDiscount] = useState(0)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      const data = await userCart(userId);
      if(data.success){
    
        const courses = data.cart.courses;
        if(courses){
          courses.map((value:ICourse)=>{
            setSubTotal((prev)=>prev+=value.price)
            setTotal((prev)=>prev+=value.price)
          })
        }
        setCart(data.cart);
      }else if(data.status == 403){
        const resp = await logout();
        if (resp.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(data.response.data.message);
          return navigate("/users/login");
        }
      }
    };
    fetching();
   
    
  }, []);

  const handleCart = async (courseId:string) => {
         console.log("jj");
         
        const data = await removeFromcart(courseId,userId);
        if(data.success){
            console.log(data.cart);
            setCart(data.cart)
            setSubTotal(0)
            setTotal(0)
           data.cart.courses.map((value:ICourse)=>{
            setSubTotal((prev)=>prev+=value.price)
            setTotal((prev)=>prev+=value.price)
          })
           return toast.success("item removed from your cart")
          }else if(data.status == 403){
            const resp = await logout();
            if (resp.succuss) {
              localStorage.setItem("accessToken", "");
              localStorage.setItem("refreshToken", "");
              dispatch(removeUser());
              toast.error(data.response.data.message);
              return navigate("/users/login");
            }
          }else{
          return toast.error(data.response.data.message)
          }
  }


const handleOrder = async () => {
  try {
      // console.log(cart);
      
          const stripe = await loadStripe(
            "pk_test_51Q4gnKRv81OVLd0JhH7b5mQdxu167NGLbtFW9DlMYb4HSblpNEHgvUNRpBbss0eb3g6moVOOvbof2Tp9sNMXKSXL00nMMkFuq7"
          );
          const data = await stripePurchase(cart?.courses!,userId,couponCode);
          console.log(data,"dataaaaa");
          
          if (data.id) {              
            await stripe?.redirectToCheckout({
              sessionId: data.id,
            });
          }else if(data.status == 403){
            const resp = await logout();
            if (resp.succuss) {
              localStorage.setItem("accessToken", "");
              localStorage.setItem("refreshToken", "");
              dispatch(removeUser());
              toast.error(data.response.data.message);
              return navigate("/users/login");
            }
          }
      
      } catch (error) {
        console.error(error);
      }
}

const applyCoupon = async () => {
    console.log("apply coupon",couponCode);
    const response = await couponDetailes(couponCode)
    if(response.success){
       if(response.coupons.users.includes(userId)){
        return toast.error("This Coupon Already Used")
       }
      setSubTotal((prev)=>prev-=subTotal*response.coupons.offer/100)
      setTotal((prev)=>prev-=subTotal*response.coupons.offer/100)
      SetDiscount(subTotal*response.coupons.offer/100)

    }else{
        toast.error(response.response.data.message)
    }
    
    
}

const removeCoupon  = () => {
  console.log("remove coupon");
      setSubTotal((prev)=>prev+discount)
      setTotal((prev)=>prev+discount)
      SetDiscount(0)
      setCouponCode("")
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
             </div>
            ))}
            </div>
            <div className="w-[300px]  h-[240px] bg-green-50  rounded-2 border shadow-lg m-2">
              <div className="m-2">
                <p className="font-medium text-s text-muted-foreground">
                  Sub totall : {subTotal}
                </p>
                <Separator className="my-1" />
                <p className="font-medium text-s text-muted-foreground">
                  Coupoun Descount : {discount}
                </p>
                <Separator className="my-1" />
                <p className="font-medium ">Total : {total}</p>
                 <div className="flex my-2 gap-2">
                  <Input type="text" className=""  value={couponCode} onChange={(e)=>{
                    let value = e.target.value.trim();
                    if(value.length == 0){
                      setSubTotal((prev)=>prev+discount)
                      setTotal((prev)=>prev+discount)
                      SetDiscount(0)
                      setCouponCode("")
                    }
                    setCouponCode(value)
                  }} placeholder="enter cupon code" /> <Button type="button" disabled={couponCode?false:true}  onClick={()=>discount?removeCoupon():applyCoupon()}>{discount?"remove":"apply"}</Button>
                 </div>
                <Button
                  type="button"
                  className="w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]"
                  onClick={handleOrder}
                >
                  purchase
                </Button>
              </div>
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
