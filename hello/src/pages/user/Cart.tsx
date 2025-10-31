import type { ICart } from "@/@types/cartType";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import useRequest from "@/hooks/useRequest";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import userRoutes from "@/service/endPoints/userEndPoints";
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
} from "@/components/ui/alert-dialog";
import {loadStripe} from "@stripe/stripe-js";
import moment from "moment";
import type { ICourse } from "@/@types/courseType";

const Cart = () => {

  const [cart, setCart] = useState<ICart>();
  const [discount, setDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const couponRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
 
  useEffect(() => {
    doRequest({
      url: `${userRoutes.Cart}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setCart(response.cart);
        setCartTotal(response.cartTotal);
      },
    });
  }, [userId]);

  const handleCart = async (courseId: string) => {
    doRequest({
      url: `${userRoutes.addToCart}?courseId=${courseId}`,
      method: "post",
      body: {userId},
      onSuccess: (data) => {
        toast.success("item removed from your cart!");
        const datas = data.cart.courses.reduce((acc:number,cur:ICourse)=>{
            console.log(acc,cur.price)
        },0)
        setCart(data.cart);
        setCartTotal(data.cartTotal);
        return 
      },
    });
  };

   const applyCoupon = async () => {
    if(couponRef.current!.value.length == 0){
      return toast.error("Please enter a coupon code!")
    }
    
      await doRequest({
        url: `${userRoutes.coupons}/${couponRef.current!.value}/${userId}`,
        method: "get",
        body: {},
        onSuccess: (response) => {
           setDiscount(Math.floor((cartTotal * response.coupons.offer) / 100));
           toast.success("Coupon applyied sucessfully");
        },
      });
    };
  
    const deleteCoupon = () => {
        toast.success("Coupon removed sucessfully");
        setDiscount(0);
        couponRef.current!.value=""
    }

   const handleOrder = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
      await doRequest({
        url: userRoutes.stripePurchase,
        body: { course: cart?.courses!, userId, couponCode:discount>0?couponRef.current!.value:"" },
        method: "post",
        onSuccess: async (data) => {
          await stripe?.redirectToCheckout({
            sessionId: data.id,
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);
  return (
    <div>
      <Header />
      {!cart || cart?.courses?.length == 0 ? (
        <div className="h-[75vh] flex justify-center items-center gap-5 ">
          <strong>No Item in Your Cart</strong>
          <button
            onClick={() => navigate("/user/courses")}
            className="text-indigo-700 cursor-pointer underline font-bold"
          >
            Go to course page
          </button>
        </div>
      ) : (
        <div>
                  <div className="md:flex md:w-[70%]  w-full gap-5 mx-auto mt-5 justify-center-safe">
          {/* iteam area  */}
          <div className="md:w-2/3  md:p-2">
            <table className="table-auto w-full border-separate">
              <thead>
                <tr>
                  <th>Iteam</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="gap-2">
                {cart?.courses.map((course) => (
                  <tr key={course._id} className="text-center md:text-sm text-xs">
                    <td className="flex md:gap-5 gap-1">
                      <img
                        onClick={()=>navigate(`/user/courseDetailes/${course._id}`)}
                        src={course.image.image_url}
                        className="w-25 h-20 rounded"
                        alt="product image"
                      />
                      <ul className="text-start w-full">
                        <li>{course.title}</li>
                        <li>Instructor: {course.instructorId.name}</li>
                        <li>Level : {course.level}</li>
                        <li>Create date : {moment(course.createdAt).calendar()}</li>
                      </ul>
                    </td>
                    <td>{course.price}</td>
                    <td>
                      <AlertDialog>
                        <AlertDialogTrigger className="cursor-pointer">X</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this course from your cart.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCart(course._id)}
                              className="bg-teal-500 hover:bg-teal-300"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* price area  */}

          <div className="md:w-1/3 flex   flex-col h-[83vh]  p-2 md:m-0 m-1 border-dashed space-y-5 items-start border-gray-400 border-2 rounded ">
            <label className="font-medium text-3xl"> Cart Total</label>
            <li className="list-none border w-full"></li>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Discount :</span>
              <span>{discount}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Sub Total : </span>
              <span>{cartTotal}</span>
            </div>
            <li className="list-none border w-full"></li>
            <div className="flex w-full justify-between">
              <span className="font-semibold">Total</span>
              <span>{cartTotal - discount}</span>
            </div>
            <li className="list-none border w-full"></li>
            <span className="font-semibold">Coupon</span>
            <input
              ref={couponRef}
              type="text"
              placeholder="enter coupon"
              className="border border-teal-400 w-full rounded-full px-2 py-1"
            />
            <button onClick={()=>discount?deleteCoupon(): applyCoupon() } className="bg-teal-500 font-semibold w-full hover:bg-teal-300 rounded cursor-pointer px-2 py-1 text-white">
               {discount ? "Remove" : "Apply"}
            </button>
            <button onClick={handleOrder} className="w-full font-semibold bg-teal-500 text-white py-1 px-2 text-sm rounded hover:bg-teal-300 cursor-pointer">
              Proceed to checkout
            </button>
          </div>
        </div>


          {/* <div className="w-3/4 flex  text-center mx-auto mt-3">
            <div className="w-full flex gap-5 ">
              <div className="w-2/3">
                <table className="table-auto w-full border-separate   border-spacing-y-4">
                  <thead className="">
                    <tr>
                      <th>Course</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.courses.map((course) => (
                      <tr key={course._id}>
                        <td className="flex gap-5" onClick={()=>navigate(`/user/courseDetailes/${course._id}`) }>
                          <img
                            src={course.image.image_url}
                            alt=""
                            className="w-25 h-20"
                          />
                          <div className="flex flex-col items-start">
                            <span>{course.title}</span>
                            
                            <span className="text-sm">instructor : { course.instructorId.name } </span>
                            <div className="flex gap-5 text-xs">
                              
                              <li>{course.level}</li>
                            </div>
                            <span className="flex gap-5 text-xs" >created : {moment(course.createdAt).calendar()}</span>
                          </div>
                        </td>
                        <td>{course.price}</td>
                        <td className="cursor-pointer">
                          <AlertDialog>
                            <AlertDialogTrigger >
                              X
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this course from your cart.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="text-white bg-teal-500 hover:bg-teal-300 hover:text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={()=>handleCart(course._id)} className="bg-teal-500 hover:bg-teal-300">
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-1/3 flex flex-col h-[75vh]  p-4 border-dashed space-y-5 items-start border-gray-400 border-2 rounded ">
                <label className="font-medium text-3xl"> Cart Total</label>
                <li className="list-none border w-full"></li>
                <div className="flex w-full justify-between">
                  <span className="font-semibold">Discount :</span>
                  <span>{discount}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span className="font-semibold">Sub Total : </span>
                  <span>{cartTotal}</span>
                </div>
                <li className="list-none border w-full"></li>
                <div className="flex w-full justify-between">
                  <span className="font-semibold">Total</span>
                  <span>{cartTotal - discount}</span>
                </div>
                <li className="list-none border w-full"></li>
                <span className="font-semibold">Coupon</span>
                <div className="flex w-full justify-between">
                  <input
                    ref={couponRef}
                    type="text"
                    placeholder="Enter coupon code"
                    className="border-teal-500 border rounded-full px-2 py-1"
                  />
                  <button onClick={()=>discount?deleteCoupon(): applyCoupon() } className="bg-teal-500 font-semibold hover:bg-teal-300 rounded cursor-pointer px-2 py-1 text-white">
                    {discount ? "Remove" : "Apply"}
                  </button>
                </div>
                 <button
                    onClick={handleOrder}
                    className="w-full font-semibold bg-teal-500 text-white py-1 px-2 rounded hover:bg-teal-300 cursor-pointer"
                  >
                    Proceed to checkout
                  </button>
              </div>
            </div>
          </div> */}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;



