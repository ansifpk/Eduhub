const instructorRoutes = { 
    //* course
    getCourses:"/course/instructor/getCourses", 
    uploadVideo:"/course/instructor/uploadVideo", 
    createCourse:"/course/instructor/createCourse", 
    allCourses:"/course/instructor/allCourses", 
    editCourse:"/course/instructor/editCourse", 
    listCourses:"/course/instructor/listCourses", 
    coursesDetailes:"/course/instructor/coursesDetailes", 
    tests:"/course/instructor/tests", 
    top5Courses:"/course/instructor/course",
    top5RatedCourses:"/course/instructor/topRated",
    login:'/auth/instructor/login',
    editProfile:"/instructor/editProfile", 
    currentUser:"/instructor/currentUser", 
    googleLogin:"/instructor/googleLogin", 
    register:"/profile/instructor/register", 
    getCategoryies:"/category/instructor/category", 
    ratings:"/profile/instructor/ratings", 
   

    //!message
    message:"/message/message",
    notification:"/message/notification",
     //chat
    chat:"/message/chat",
    privetChat:"/message/chat/privetChat",
    //*subscription
    subscription:"/purchase/instructor/subscription",
    subscribe:"/purchase/instructor/subscribe",
    customer:"/purchase/instructor/customer",
    //*salesReports
    salesReports:"/purchase/instructor/salesReports",
    order:"/purchase/instructor/order",
}  

export default instructorRoutes