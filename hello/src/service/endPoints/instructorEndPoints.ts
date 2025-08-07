
const instructorRoutes = {
    getCourses:"/course/course/instructor/getCourses", 
    students:"/course/course/instructor/students", 
    courseDeatiles:"/course/course/instructor/courseDetailes",
    uploadVideo:"/course/course/instructor/uploadVideo", 
    createCourse:"/course/course/instructor/createCourse", 
    allCourses:"/course/course/instructor/allCourses", 
    editCourse:"/course/course/instructor/editCourse", 
    listCourses:"/course/course/instructor/listCourses", 
    testDetailes:"/course/course/instructor/testDetailes", 
    tests:"/course/course/instructor/tests", 
    top5Courses:"/course/course/instructor/course",
    top5RatedCourses:"/course/course/instructor/topRated",
    editProfile:"/instructor/instructor/editProfile", 
    currentUser:"/instructor/instructor/currentUser", 
    googleLogin:"/instructor/instructor/googleLogin", 
    register:"/profile/profile/instructor/register", 
    getCategoryies:"/category/category/instructor/category", 
    ratings:"/profile/profile/instructor/ratings", 
    
    //*auth
    login:'/auth/auth/instructor/login',
    logout:'/auth/auth/instructor/logout',
    tocken:"/auth/auth/instructor/refresh-token",

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