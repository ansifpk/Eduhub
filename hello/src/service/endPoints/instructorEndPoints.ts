
const instructorRoutes = {
    getCourses:"/course/instructor/getCourses", 
    students:"/course/instructor/students",
    courseDeatiles:"/course/instructor/courseDetailes",
    uploadVideo:"/course/instructor/uploadVideo", 
    createCourse:"/course/instructor/createCourse", 
    allCourses:"/course/instructor/allCourses", 
    editCourse:"/course/instructor/editCourse", 
    listCourses:"/course/instructor/listCourses", 
    testDetailes:"/course/instructor/testDetailes", 
    tests:"/course/instructor/tests", 
    top5Courses:"/course/instructor/course",
    top5RatedCourses:"/course/instructor/topRated",
    editProfile:"/instructor/editProfile", 
    register:"/profile/profile/instructor/register", 
    getCategoryies:"/category/instructor/category", 
    ratings:"/profile/instructor/ratings", 
    
    //*auth
    login:'/auth/instructor/login',
    logout:'/auth/instructor/logout',
    tocken:"/auth/instructor/refresh-token",

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