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
 puchasedCourses:"/course/course/user/puchasedCourses",
 stripePurchase:"/course/course/user/create-checkout-session",
 courseDeatiles:"/course/course/user/courseDetailes",
 createOrder:"/purchase/purchase/user/createOrder",
}

export default userRoutes