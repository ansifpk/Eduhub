const instructorRoutes = { 
    //* course
    getCourses:"/course/course/instructor/getCourses", 
    uploadVideo:"/course/course/instructor/uploadVideo", 
    createCourse:"/course/course/instructor/createCourse", 
    allCourses:"/course/course/instructor/allCourses", 
    editCourse:"/course/course/instructor/editCourse", 
    listCourses:"/course/course/instructor/listCourses", 
    coursesDetailes:"/course/course/instructor/coursesDetailes", 
    tests:"/course/course/instructor/tests", 
    top5Courses:"/course/course/instructor/course",
    top5RatedCourses:"/course/course/instructor/topRated",
    login:'/auth/auth/instructor/login',
    editProfile:"/instructor/editProfile", 
    currentUser:"/instructor/currentUser", 
    googleLogin:"/instructor/googleLogin", 
    register:"/profile/profile/instructor/register", 
    getCategoryies:"/category/category/instructor/category", 
    ratings:"/profile/profile/instructor/ratings", 
   

    //!message
    message:"/message/message/message",
    notification:"/message/message/notification",
     //chat
    chat:"/message/message/chat",
    privetChat:"/message/message/chat/privetChat",
    //*subscription
    subscription:"/purchase/purchase/instructor/subscription",
    subscribe:"/purchase/purchase/instructor/subscribe",
    customer:"/purchase/purchase/instructor/customer",
    //*salesReports
    salesReports:"/purchase/purchase/instructor/salesReports",
    order:"/purchase/purchase/instructor/order",
}  

export default instructorRoutes