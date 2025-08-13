const instructorRoutes = { 
    //* course
    getCourses:"/course/course/instructor/getCourses", 
    courseDeatiles:"/course/course/instructor/courseDetailes",
    uploadVideo:"/course/course/instructor/uploadVideo", 
    createCourse:"/course/course/instructor/createCourse", 
    allCourses:"/course/course/instructor/allCourses", 
    editCourse:"/course/course/instructor/editCourse", 
    listCourses:"/course//instructor/listCourses", 
    testDetailes:"/course/course/instructor/testDetailes", 
    tests:"/course/course/instructor/tests", 
    top5Courses:"/course/instructor/course",
    top5RatedCourses:"/course/instructor/topRated",
    editProfile:"/instructor/editProfile", 
    currentUser:"/instructor/currentUser", 
    googleLogin:"/instructor/googleLogin", 
    register:"/profile/instructor/register", 
    getCategoryies:"/category/category/instructor/category", 
    ratings:"/profile/instructor/ratings", 
    
    //*auth
    login:'/auth/auth/instructor/login',
    logout:'/auth/auth/instructor/logout',
    tocken:"/auth/auth/instructor/refresh-token",

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