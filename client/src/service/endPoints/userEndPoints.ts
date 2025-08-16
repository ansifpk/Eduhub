const userRoutes = {
    
 // auth servic end poin
 signUp:'/auth/user/register',
 login:'/auth/auth/auth/user/login',
 googleLogin:'/auth/user/googleLogin',
 verifyOtp:'/auth/user/createUser',
 resentOtp:"/auth/user/resentOtp",
 verifyEmail:"/auth/user/forgetPassword",
 verifyPassOtp:"/auth/user/verifyOtp",
 newPassword:"/auth/user/newPassword",
 resetPassword:"/auth/user/resetPassword",
 logout:'/auth/user/logout',

 // user servic end points
 editUser:'/profile/user/profile',
 changeEmailVeryfy:'/user/verifyEmail',
 changeEmail:'/auth/changeEmail',

 getCourses:"/course/user/courses",
 fetchCourses:"/course/user/getCourses",
 puchasedCourses:"/course/user/puchasedCourses",
 stripePurchase:"/course/user/create-checkout-session",
 courseDeatiles:"/course/user/courseDetailes",
 ratingCourse:"/course/user/rating",
 report:"/course/user/report",
 test:"/course/user/test",


 // purchase
 createOrder:"/profile/user/createOrder",

 addToCart:"/profile/user/Cart",
 Cart:"/profile/user/Cart",
 profile:"/profile/user/profile",
 profileImage:"/profile/user/profileImage",
 instructorRating:"/profile/user/rating",
 
 //coupons
 coupons:"/course/user/coupons",
 
 //chat
 chat:"/message/chat",
 privetChat:"/message/chat/privetChat",

 //chat
 message:"/message/message",
 notification:"/message/notification",

 //*subscriptions
 subscriptions:"/purchase/user/subscription",
 plans:"/purchase/user/subscribe",
 customer:"/purchase/user/customer",
 tocken:"/auth/auth/user/refresh-token",

}

export default userRoutes