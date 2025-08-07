const userRoutes = {
    
 // auth servic end poin
 signUp:'/auth/auth/user/register',
 login:'/auth/auth/user/login',
 googleLogin:'/auth/user/googleLogin',
 verifyOtp:'/auth/auth/user/createUser',
 resentOtp:"/auth/user/resentOtp",
 verifyEmail:"/auth/user/forgetPassword",
 verifyPassOtp:"/auth/user/verifyOtp",
 newPassword:"/auth/user/newPassword",
 resetPassword:"/auth/auth/user/resetPassword",
 logout:'/auth/auth/user/logout',

 // user servic end points
 editUser:'/profile/profile/user/profile',
 changeEmailVeryfy:'/user/user/verifyEmail',
 changeEmail:'/auth/auth/changeEmail',

 getCourses:"/course/course/user/courses",
 fetchCourses:"/course/course/user/getCourses",
 puchasedCourses:"/course/course/user/puchasedCourses",
 stripePurchase:"/course/course/user/create-checkout-session",
 courseDeatiles:"/course/course/user/courseDetailes",
 ratingCourse:"/course/course/user/rating",
 report:"/course/course/user/report",
 test:"/course/course/user/test",


 // purchase
 createOrder:"/profile/profile/user/createOrder",
 addToCart:"/profile/profile/user/Cart",
 Cart:"/profile/profile/user/Cart",
 profile:"/profile/profile/user/profile",
 profileImage:"/profile/profile/user/profileImage",
 instructorRating:"/profile/profile/user/rating",
 
 //coupons
 coupons:"/course/course/user/coupons",
 
 //chat
 chat:"/message/message/chat",
 privetChat:"/message/message/chat/privetChat",

 //chat
 message:"/message/message/message",
 notification:"/message/message/notification",

 //*subscriptions
 subscriptions:"/purchase/purchase/user/subscription",
 plans:"/purchase/purchase/user/subscribe",
 customer:"/purchase/purchase/user/customer",
 tocken:"/auth/auth/user/refresh-token",

}

export default userRoutes