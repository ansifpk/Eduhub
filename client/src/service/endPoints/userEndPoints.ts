const userRoutes = {
    
 // auth servic end points
 signUp:'/auth/auth/user/register',
 login:'/auth/auth/user/login',
 googleLogin:'/auth/auth/user/googleLogin',
 verifyOtp:'/auth/auth/user/createUser',
 resentOtp:"/auth/auth/user/resentOtp",
 verifyEmail:"/auth/auth/user/forgetPassword",
 verifyPassOtp:"/auth/auth/user/verifyOtp",
 newPassword:"/auth/auth/user/newPassword",
 logout:'/auth/auth/user/logout',

 // user servic end points
 editUser:'/auth/auth/user/editUser',
 getCourses:"/course/course/user/courses",
 fetchCourses:"/course/course/user/getCourses",
 puchasedCourses:"/course/course/user/puchasedCourses",
 stripePurchase:"/course/course/user/create-checkout-session",
 courseDeatiles:"/course/course/user/courseDetailes",
 ratingCourse:"/course/course/user/rating",


 // purchase
 createOrder:"/purchase/purchase/user/createOrder",

 addToCart:"/profile/profile/user/Cart",
 Cart:"/profile/profile/user/Cart",
 profile:"/profile/profile/user/profile",
 instructorRating:"/profile/profile/user/rating",

}

export default userRoutes