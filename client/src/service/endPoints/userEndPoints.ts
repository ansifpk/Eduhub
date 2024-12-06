const userRoutes = {
    
 // auth servic end points
 signUp:'/auth/user/register',
 login:'/auth/user/login',
 googleLogin:'/auth/user/googleLogin',
 verifyOtp:'/auth/user/createUser',
 resentOtp:"/auth/user/resentOtp",
 verifyEmail:"/auth/user/forgetPassword",
 verifyPassOtp:"/auth/user/verifyOtp",
 newPassword:"/auth/user/newPassword",
 logout:'/auth/user/logout',

 // user servic end points
 editUser:'/user/editUser',
 getCourses:"/course/user/courses",
 puchasedCourses:"/user/puchasedCourses",
 courseDeatiles:"/user/courseDetailes",
 createOrder:"/user/createOrder",
}

export default userRoutes