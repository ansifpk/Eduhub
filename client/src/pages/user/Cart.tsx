import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import {
  logout,
  stripePurchase,
} from "@/Api/user";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { ICart } from "@/@types/cartType";
import { ICourse } from "@/@types/courseType";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/Components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { removeUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  
} from "@/Components/ui/card";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";


const Cart = () => {
  const [cart, setCart] = useState<ICart>();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const userId = useSelector((state: User) => state.id);
  const [couponCode, setCouponCode] = useState("");
  const [discount, SetDiscount] = useState(0);
  const {doRequest,errors} = useRequest()
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      await doRequest({
        url:`${userRoutes.Cart}/${userId}`,
        method:"get",
        body:{},
        onSuccess:(response)=>{
          const courses = response.cart.courses;
          if(courses){
            courses.map((value: ICourse)=>{
              setSubTotal((prev) => (prev += value.price));
              setTotal((prev) => (prev += value.price));
            })
          }
          setCart(response.cart);
        }
      })
    };
    fetching();
  }, []);

  const handleCart = async (courseId: string) => {
    doRequest({
      url:`${userRoutes.addToCart}/${courseId}/${userId}`,
      method:"delete",
      body:{},
      onSuccess:(data)=>{
        setCart(data.cart);
        setSubTotal(0);
        setTotal(0);
        data.cart.courses.map((value: ICourse) => {
          setSubTotal((prev) => (prev += value.price));
          setTotal((prev) => (prev += value.price));
        });
        return toast.success("item removed from your cart");
      }
    })
  };

  const handleOrder = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Q4gnKRv81OVLd0JhH7b5mQdxu167NGLbtFW9DlMYb4HSblpNEHgvUNRpBbss0eb3g6moVOOvbof2Tp9sNMXKSXL00nMMkFuq7"
      );
      const data = await stripePurchase(cart?.courses!, userId, couponCode);

      if (data.id) {
        await stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      } else if (data.status == 403) {
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
  };

  const applyCoupon = async () => {
    await doRequest({
      url:`${userRoutes.coupons}/${couponCode}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        if (response.coupons.users.includes(userId)) {
          return toast.error("This Coupon Already Used");
        }
        setSubTotal(
          (prev) => (prev -= (subTotal * response.coupons.offer) / 100)
        );
        setTotal((prev) => (prev -= (subTotal * response.coupons.offer) / 100));
        SetDiscount((subTotal * response.coupons.offer) / 100);
      }
    })
   
  };

  const removeCoupon = () => {
    setSubTotal((prev) => prev + discount);
    setTotal((prev) => prev + discount);
    SetDiscount(0);
    setCouponCode("");
  };
  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors])
  return (
    <div className="h-screen flex flex-col">
    <Header />
    {cart?.courses?.length! > 0 ? (
      <div className="md:w-50 sm:w-full w-full flex md:justify-center sm:justify-center mt-16 md:gap-2 sm:gap-3 gap-1 md:pt-3 sm:pt-3 flex-1">
        <div className="md:w-75 sm:w-72 w-7/12 pl-1 space-y-2">
          {cart?.courses.map((value, index) => (
            <div key={index} className="border-1 rounded shadow-lg">
              <div className="flex">
                <img
                  src={value.image.image_url}
                  alt={value.title}
                  className="sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[200px] w-[100px] h-[60px] object-fill border m-1 rounded-2"
                />
                <div className="mt-1 space-y-1">
                  <div className="md:text-xs sm:text-[8px] text-[6px]">
                    Category: {value.category}
                  </div>
                  {/* <br /> */}
                  <div className="font-medium md:text-xs sm:text-[8px] text-[6px] text-muted-foreground">
                    Topic: {value.subCategory}
                  </div>
                  {/* <br /> */}
                  <div className="font-medium md:text-xs sm:text-[8px] text-[6.5px] text-muted-foreground">
                    Instructor: {value.instructorId.name}
                  </div>
                  {/* <br /> */}
                </div>
                <div className="sm:w-25 w-25 mt-1">
                  <div className="flex justify-end items-end">
                    <X
                      className="cursor-pointer sm:h-[15px] h-[10px]"
                      onClick={() => handleCart(value._id)}
                    />
                  </div>
                  <div className="font-medium md:text-xs md:text-[8px] text-[6.5px] text-muted-foreground">
                    Price: {value.price}
                  </div>
                 
                </div>
              </div>
              <span className="pl-1 font-medium">{value.title}</span>
            </div>
          ))}
        </div>
        <div className="md:w-50 sm:w-48 w-40 h-[150px] bg-green-50 rounded-2 border shadow-lg p-1">
          <span className="font-medium md:text-xs text-[12px] text-muted-foreground">
            Sub total: {subTotal}
          </span>
          <Separator className="my-1" />
          <span className="font-medium md:text-xs sm:text-xs text-[12px] text-muted-foreground">
            Coupon Discount: {discount}
          </span>
          <Separator className="my-1" />
          <span className="font-medium md:text-xs sm:text-xs text-[12px]">Total: {total}</span>
          <Separator />
          <div className="flex my-2 gap-2">
            <Input
              type="text"
              className="md:w-full sm:w-28 w-20 text-xs"
              maxLength={10}
              value={couponCode}
              onChange={(e) => {
                let value = e.target.value.trim();
                if (value.length == 0) {
                  setSubTotal((prev) => prev + discount);
                  setTotal((prev) => prev + discount);
                  SetDiscount(0);
                  setCouponCode("");
                }
                setCouponCode(value);
              }}
              placeholder="Enter coupon code"
            />
            <Button
              size={"sm"}
              className="md:text-sm sm:text-xs text-[12px]"
              type="button"
              disabled={!couponCode}
              onClick={() => (discount ? removeCoupon() : applyCoupon())}
            >
              {discount ? "Remove" : "Apply"}
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="h-full flex justify-center items-center flex-1">
        <Card className="w-4/5 sm:w-1/2 h-[200px] flex justify-center items-center">
          <CardContent>
            <CardDescription>No courses available</CardDescription>
          </CardContent>
        </Card>
      </div>
    )}
    <Footer />
  </div>
  
    // <div className="flex flex-col md:items-center md:justify-center">
    //   <Header />
    //   {
    //     cart?.courses?.length!>0?(
    //      <div className="flex flex-cols-2 mt-16 md:mx-auto  justify-center">
    //        <div>
    //        {cart?.courses?.map((value, index) => (
    //           <div
    //            className="md:w-[500px] md:h-[170px]  w-[250px] h-[150px] bg-blue-50  rounded-2 border shadow-lg md:m-2"
    //            key={index}
    //            >
    //            <div className="flex">
    //              <div className="flex md:w-[400px] md:h-[130px] overflow-hidden w-[250px] h-[100px]  ">
    //                <img
    //                  src={value.image.image_url}
    //                  width={"200px"}
    //                  height={"150px"}
    //                  alt={value.title}
    //                  className="md:h-[120px] h-[100px] w-[100px]  md:w-[200px]  object-fill border m-1 rounded-2"
    //                />
    //                <div className="flex md:justify-center md:items-center">
    //                  <div>
    //                   <span className="md:text-xs text-[8px] " >Category:{value.category}</span> <br />
    //                   <span className="font-medium md:text-xs text-[8px] text-muted-foreground" > Topic: {value.subCategory} </span><br />
    //                   <span className="font-medium md:text-xs text-[8px] text-muted-foreground" >  Instructor: {value.instructorId.name} </span><br />
    //                  </div>
    //                </div>
    //              </div>
    //              <div className="flex space-x-5 m-1">
    //               <div className="">
    //                 <span className="md:text-xs text-[8px]">Price</span>
    //                 <span className="font-medium md:text-xs text-[8px] text-muted-foreground"> RS:{value.price}</span>
    //               </div>
    //                <X className="cursor-pointer" onClick={()=>handleCart(value._id)}/>
    //              </div>
    //            </div>
    //              <span className="text-black text-xs md:text-medium ml-1">{value.title}</span>
    //          </div>
    //        ))}
    //        </div>

    //        <div className="md:w-[230px] md:h-[200px] w-[200px] h-[200px] bg-green-50  rounded-2 border shadow-lg m-2">
    //           <div className="m-2">
    //             <span className="font-medium text-xs text-muted-foreground"> Sub totall : {subTotal}</span>
    //             <Separator className="my-1" />
    //             <span className="font-medium text-xs text-muted-foreground">  Coupoun Descount : {discount}</span>
    //             <Separator className="my-1" />
    //              <span className="font-medium text-xs">Total : {total}</span>
    //             <Separator  />
    //              <div className="flex my-2 gap-2">
    //               <Input type="text" className="md:w-full  w-28 text-xs" maxLength={10}  value={couponCode} onChange={(e)=>{
    //                 let value = e.target.value.trim();
    //                 if(value.length == 0){
    //                   setSubTotal((prev)=>prev+discount)
    //                   setTotal((prev)=>prev+discount)
    //                   SetDiscount(0)
    //                   setCouponCode("")
    //                 }
    //                 setCouponCode(value)
    //               }} placeholder="enter cupon code" />
    //              <Button size={"sm"} className="md:text-xm text-xs" type="button" disabled={couponCode?false:true}  onClick={()=>discount?removeCoupon():applyCoupon()}>{discount?"remove":"apply"}</Button>
    //              </div>
    //             <Button
    //               type="button"
    //               className="w-full bg-[#49BBBD] text-white hover:bg-[#49BBBD]"
    //               onClick={handleOrder}
    //             >
    //               purchase
    //             </Button>
    //           </div>
    //        </div>
    //      </div>

    //     ):(
    //       <Card className="mt-32 w-50 mx-auto text-center flex justify-center bg-blue-50 shadow-lg">
    //          <CardContent className="py-5">
    //             <CardTitle className="text-lg">Cart is Empty</CardTitle>
    //             <Button className="bg-teal-400 hover:bg-teal-400" onClick={() => navigate("/users/courses")} size={'sm'}>Courses</Button>
    //          </CardContent>
    //       </Card>
    //     )
    //   }
    //   <Footer />
    // </div>
  );
};

export default Cart;
