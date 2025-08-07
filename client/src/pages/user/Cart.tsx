import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../@types/userType";
import { ICart } from "../../@types/cartType";
import { ICourse } from "../../@types/courseType";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { loadStripe } from "@stripe/stripe-js";

import { Card, CardContent, CardDescription } from "../../components/ui/card";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";

const Cart = () => {
  const [cart, setCart] = useState<ICart>();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const userId = useSelector((state: User) => state.id);
  const [couponCode, setCouponCode] = useState("");
  const [discount, SetDiscount] = useState(0);
  const { doRequest, errors } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${userRoutes.Cart}/${userId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        const courses = response.cart.courses;
        if (courses) {
          courses.map((value: ICourse) => {
            setSubTotal((prev) => (prev += value.price));
            setTotal((prev) => (prev += value.price));
          });
        }
        setCart(response.cart);
      },
    });
  }, []);

  const handleCart = async (courseId: string) => {
    doRequest({
      url: `${userRoutes.addToCart}/${courseId}/${userId}`,
      method: "delete",
      body: {},
      onSuccess: (data) => {
        setCart(data.cart);
        setSubTotal(0);
        setTotal(0);
        data.cart.courses.map((value: ICourse) => {
          setSubTotal((prev) => (prev += value.price));
          setTotal((prev) => (prev += value.price));
        });
        return toast.success("item removed from your cart");
      },
    });
  };

  const handleOrder = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_SECRET);
      await doRequest({
        url: userRoutes.stripePurchase,
        body: { course: cart?.courses!, userId, couponCode },
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

  const applyCoupon = async () => {
    await doRequest({
      url: `${userRoutes.coupons}/${couponCode}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        if (response.coupons.users.includes(userId)) {
          setCouponCode("")
          return toast.error("This Coupon Already Used");
        }
        const today = new Date()
        if(response.coupons.expiryDate<`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`){
          setCouponCode("")
          return toast.error("This Coupon Expired ");
        }
        setSubTotal(
          (prev) => (prev -= (subTotal * response.coupons.offer) / 100)
        );
        setTotal((prev) => (prev -= (subTotal * response.coupons.offer) / 100));
        SetDiscount((subTotal * response.coupons.offer) / 100);
      },
    });
  };

  const removeCoupon = () => {
    setSubTotal((prev) => prev + discount);
    setTotal((prev) => prev + discount);
    SetDiscount(0);
    setCouponCode("");
  };
  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);
  return (
    <div className="h-screen flex flex-col">
      <Header />
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
                    onClick={() => handleCart(value._id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-50 sm:w-48 w-40 h-[200px] bg-green-50 rounded-2 border shadow-lg p-1">
            <span className="font-medium md:text-xs text-[12px] text-muted-foreground">
              Sub total: {subTotal}
            </span>
            <Separator className="my-1" />
            <span className="font-medium md:text-xs sm:text-xs text-[12px] text-muted-foreground">
              Coupon Discount: {discount}
            </span>
            <Separator className="my-1" />
            <span className="font-medium md:text-xs sm:text-xs text-[12px]">
              Total: {total}
            </span>
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
            <Button
              onClick={handleOrder}
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
              <CardDescription>No courses available</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
