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
      url: `${userRoutes.addToCart}/${courseId}/${userId}`,
      method: "delete",
      body: {},
      onSuccess: (data) => {
        setCart(data.cart);
        setCartTotal(data.cartTotal);
        return toast.success("item removed from your cart");
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
           setCartTotal(cartTotal - Math.floor((cartTotal * response.coupons.offer) / 100));
           toast.success("Coupon applyied sucessfully");
        },
      });
    };
  
    const deleteCoupon = () => {
        toast.success("Coupon removed sucessfully");
        setDiscount(0);
        setCartTotal(cartTotal + discount);
    }

   const handleOrder = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
      await doRequest({
        url: userRoutes.stripePurchase,
        body: { course: cart?.courses!, userId, couponCode:couponRef.current!.value },
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
      {cart?.courses.length == 0 ? (
        <div className="h-[75vh] flex justify-center items-center gap-5 ">
          <strong>No Item in Your Cart</strong>
          <button
            onClick={() => navigate("/user/courses")}
            className="text-indigo-700 cursor-pointer underline font-bold"
          >
            purchase course
          </button>
        </div>
      ) : (
        <div>
          <div className="w-3/4 flex  text-center mx-auto mt-3">
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
                        <td className="flex gap-2" onClick={()=>navigate(`/user/courseDetailes/${course._id}`) }>
                          <img
                            src={course.image.image_url}
                            alt=""
                            className="w-25 h-20"
                          />
                          <div className="flex flex-col items-start">
                            <span>{course.title}</span>
                            <span className="text-xs">
                              4.5 <i className={`bi bi-star-fill`}></i>{" "}
                              <i className={`bi bi-star-fill`}></i>{" "}
                              <i className={`bi bi-star-fill`}></i>
                              <i className={`bi bi-star-fill`}></i> (1000
                              ratings){" "}
                            </span>
                            <div className="flex gap-5 text-xs">
                              <li>10 hr</li>
                              <li>10 videos</li>
                              <li>{course.level}</li>
                            </div>
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;

{
  /* <div className={"container mx-auto"}>
       <Header />
      <div className={`container`} >
        {cart?.courses?.length! > 0 ? (
          <div className=" w-full flex justify-center mt-16 md:gap-2 sm:gap-3 gap-1 md:pt-3 sm:pt-3 flex-1">
            <div className="md:w-[500px] sm:w-72 w-7/12 pl-1 space-y-2 ">
              {cart?.courses.map((value, index) => (
                <div
                  key={index}
                  className="border-1 rounded shadow-lg flex gap-5"
                >
                  <div>
                    <img
                      src={value.image.image_url}
                      alt={value.title}
                      className="sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[200px] w-[100px] h-[60px] object-fill border m-1 rounded-2"
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <div>
                      <span className="pl-1 font-medium">{value.title}</span>

                      <p className="md:text-base sm:text-[8px] text-[6px]">
                        Category: {value.category}
                      </p>
                      <p className="font-medium md:text-sm sm:text-[8px] text-[6px] text-muted-foreground">
                        Topic: {value.subCategory}
                      </p>
                      <p className="font-medium md:text-sm sm:text-[8px] text-[6.5px] text-muted-foreground">
                        Instructor: {value.instructorId.name}
                      </p>
                      <p className="font-medium md:text-xs md:text-[8px] text-[6.5px] text-muted-foreground">
                        Price: {value.price}
                      </p>
                    </div>
                    <i
                      className="bi bi-x-lg"
                      // onClick={() => handleCart(value._id)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-50 sm:w-48 w-40 h-[200px] bg-green-50 rounded-2 border shadow-lg p-1">
              <span className="font-medium md:text-xs text-[12px] text-muted-foreground">
                Sub total: {subTotal}
              </span>
          
              <span className="font-medium md:text-xs sm:text-xs text-[12px] text-muted-foreground">
                Coupon Discount: {discount}
              </span>
            
              <span className="font-medium md:text-xs sm:text-xs text-[12px]">
                Total: {total}
              </span>

              <div className="flex my-2 gap-2">
                <input
                  type="text"
                  className="md:w-full sm:w-28 w-20 text-xs"
                  maxLength={10}
                  value={couponCode}
                  // onChange={(e) => {
                  //   let value = e.target.value.trim();
                  //   if (value.length == 0) {
                  //     setSubTotal((prev) => prev + discount);
                  //     setTotal((prev) => prev + discount);
                  //     SetDiscount(0);
                  //     setCouponCode("");
                  //   }
                  //   setCouponCode(value);
                  // }}
                  placeholder="Enter coupon code"
                />
                <Button
                  size={"sm"}
                  className="md:text-sm sm:text-xs text-[12px]"
                  type="button"
                  disabled={!couponCode}
                  // onClick={() => (discount ? removeCoupon() : applyCoupon())}
                >
                  {discount ? "Remove" : "Apply"}
                </Button>
              </div>
              <Button
                //   onClick={handleOrder}
                className="w-full bg-teal-400 hover:bg-teal-600 cursor-pointer"
              >
                Purchase
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center flex-1">
            <Card className="w-4/5 sm:w-1/2 h-[200px] flex justify-center items-center">
              <CardContent>
                <CardDescription>No courses in Cart</CardDescription>
              </CardContent>
            </Card>
          </div>
        )}
      </div> 
       <Footer />
     </div> */
}


